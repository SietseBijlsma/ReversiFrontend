const Game = ((url) =>{

    let configMap = {
        apiUrl: url
    }

    const privateInit = (env) =>{
        //init model
        Game.Data.init(env);
        setInterval(() => {
            _getCurrentGamestate()
        }, 2000)
    }
    const _getCurrentGamestate = () => {
        Game.Model.getGameState();
    }

    return {
        init: privateInit
    }

})('/api/url')

Game.Data = (() =>{

    let stateMap = { 'environment' : 'developement' }

    let configMap = {
        mock:
            {
            url: 'api/Spel/Beurt',
            data: 0
            },
        apiKey: 'e75be00d6b404d31f5b679a85c9d00c1'
    };

    const getMockData = function(url){
        const mockData = configMap.mock;
        return new Promise((resolve, reject) => {
        resolve(mockData);
        });
    }

    const get = function(url){
        return stateMap.environment === 'production' ? $.get(url) : getMockData(url);
    }

    const privateInit = (environment) => {
        stateMap.environment = environment
        if(stateMap.environment === undefined)
            throw new Error("Undefined enviroment")
    }

    return {
        init: privateInit,
        get: get
    }
})()

Game.Model = (() =>{
    
    let configMap = {

    }

///api/Spel/Beurt/ make variable not static
    const _getGameState = function(token){
        Game.Data.get('/api/Spel/Beurt/' + token).then(x => {
            switch(x.data) {
                case 0: 
                    console.log("geen specifieke waarde")
                    break;
                case 1: 
                    console.log("wit is aan zet")
                    break;
                case 2: 
                    console.log("zwart is aan zet")
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

    let statemap = {
        moving : 1, 
        board: []
    }

    const board = () => {
        $boardTemplate = $(`<div class="board" style="
        grid-template-columns: repeat(${configMap.boardSize}, 2rem); 
        grid-template-rows: repeat(${configMap.boardSize}, 2rem);
        ></div>`);

        for (let row = 0; row < configMap.boardSize; row++) {
            for (let col = 0; col < configMap.boardSize; col++) {
                
            }
        }

    }
})