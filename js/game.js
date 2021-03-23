const Game = ((url) =>{

    let configMap = {
        apiUrl: url
    }

    const privateInit = (env, token, playerToken) =>{
       
        Game.Data.init(env);
        Game.Board.init('board', token, playerToken);
        // setInterval(() => {
        //     _getCurrentGamestate()
        // }, 2000)
        update();
    }

    const update = () => {
        Game.Board.update();
    }

    const _getCurrentGamestate = () => {
        Game.Model.getGameState();
    }

    return {
        init: privateInit,
        update: update
    }

})('/api/url')

Game.Data = (() =>{

    let stateMap = { 
        'environment' : 'developement',
        'baseUrl' : 'https://localhost:5001/api/'
    };

    let configMap = {
        mock:
            {
            url: 'api/Spel/Beurt',
            data: 0
            },
        apiKey: 'e75be00d6b404d31f5b679a85c9d00c1'
    };

    const getMockData = (url) => {
        const mockData = configMap.mock;
        return new Promise((resolve, reject) => {
        resolve(mockData);
        });
    }

    const putMockData = (url, data) => {
        //TODO: make this function
    }

    const get = (url) => {
        return stateMap.environment === 'development' ? getMockData(url) : 
        $.ajax({
            type: 'GET',
            crossDomain: true,
            url: stateMap.baseUrl + url
        });
    }

    const put = (url, data) => {
        return stateMap.environment === 'development' ? putMockData(url) : 
        $.ajax({
            url: stateMap.baseUrl + url,
            type: 'PUT',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossDomain: true
        });
    }

    const _privateInit = (environment) => {
        stateMap.environment = environment
        if(stateMap.environment === undefined)
            throw new Error("Undefined enviroment")
    }

    return {
        init: _privateInit,
        get: get,
        put: put
    }
})()

Game.Model = (() =>{
    
    let configMap = {

    }

///api/Spel/Beurt/ make variable not static
    const _getGameState = function(token){
        Game.Data.get('game/turn' + token).then(x => {
            switch(x.data) {
                case 0: 
                    //console.log("geen specifieke waarde")
                    break;
                case 1: 
                    //console.log("wit is aan zet")
                    break;
                case 2: 
                    //console.log("zwart is aan zet")
                    break;
                default:
                    throw new Error('unknown gamestate')
            }
        })
    }

    return {
        getGameState: _getGameState
        }
})()

Game.Board = (() =>{
    
    let configMap = {
        boardSize: 8,
    }

    //0 = white 
    //1 = black
    let stateMap = {
        token: "",
        moving : 1, 
        board: [],
        currentPlayerToken: "",
    }

    const board = () => {
        $boardTemplate = $(`<div class="board" style="
        grid-template-columns: repeat(${configMap.boardSize}, 4rem); 
        grid-template-rows: repeat(${configMap.boardSize}, 4rem);"
        ></div>`);

        for (let row = 0; row < configMap.boardSize; row++) {
            for (let col = 0; col < configMap.boardSize; col++) {
                $cell = $(`<div class="cell" data-row="${row}" data-col="${col}"><div class="fiche"></div></div>`);

                $cell.on('click', function () {
                    _placeFiche($(this).attr('data-row'), $(this).attr('data-col'));
                });
                $boardTemplate.append($cell);
            }
        }

        stateMap.$board.append($boardTemplate);
    }

    const _init = (parentBoard, token, playerToken) => {
        stateMap.token = token;
        stateMap.$board = $(`#${parentBoard}`);
        stateMap.currentPlayerToken = playerToken;
        board();
    }

    const _placeFiche = async (row, col) => {
       let result = await Game.Data.put(`game/${stateMap.token}/move`, {
            row: parseInt(row),
            col: parseInt(col),
            player: stateMap.currentPlayerToken
       }).then(res => res).catch(e => false);

       if(result) {
           _update();
           _updateBoard();
           stateMap.$board.trigger('updateBoard');
       }
    }

    const _updateBoard = () => {
        for (let row = 0; row < configMap.boardSize; row++) {
            for (let col = 0; col < configMap.boardSize; col++) {
                let color = "";
                if(stateMap.board[row][col] == 1) {
                    color = "white";
                }
                else if(stateMap.board[row][col] == 2) {
                    color = "black";
                }

                if(color == "white") {
                    _getCoords(row, col).find('.fiche').removeClass("black");
                }
                else if (color == "black") {
                    _getCoords(row, col).find('.fiche').removeClass("white");
                }
                _getCoords(row, col).find('.fiche').addClass(color);
            }
        }
    }

    const _update = () => {
        Game.Data.get("game/" + stateMap.token).then(res => {
            stateMap.board = JSON.parse(res.board);
            stateMap.moving = res.moving;
            _updateBoard();
        }).catch(_ => {
            
            _update();
        })
    }

    const _getCoords = (row, col) => {
        if(row >= 0 && row < configMap.boardSize && col >= 0 && col < configMap.boardSize) {
            return stateMap.$board.find(`.cell[data-row="${row}"][data-col="${col}"]`);
        }
        return false;
    }

    return {
        init: _init,
        placeFiche: _placeFiche,
        update: _update,
    }
})()
