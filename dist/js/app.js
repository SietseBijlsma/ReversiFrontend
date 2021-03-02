class FeedbackWidget{
    constructor(elementId) 
    {
         this._elementId = elementId;
         this.$element = $("#" + this._elementId);
    }
    get elementId() 
    { 
         return this._elementId;
    }
    show(type, message)
    {
        this.$element.html(`<pre>${message}</pre>`);
        this.$element.css("display", "block");
        if(type == "success") 
        {
            this.$element.removeClass("alert alert-danger");
            this.$element.addClass("alert alert-success");
        }
       else {
            this.$element.removeClass("alert alert-succes");
            this.$element.addClass("alert alert-danger");
       }   
       
    }
    hide() {
        this.$element.css("display", "none");
    }
    //log({type:"success", message:"test"})
    log(message) {
        let logs = JSON.parse(localStorage.getItem('feedback_widget')) ?? [];
        logs.push(message);

        if(logs.length > 10) 
            logs.splice(0, 1);

        localStorage.setItem('feedback_widget', JSON.stringify(logs));
    }
    removeLog(key) {
        localStorage.removeItem(key);
    }
    history() {
        let logs = JSON.parse(localStorage.getItem('feedback_widget')) ?? [];
        let string = logs.map(x => "type " + x.type + " - " + x.message).join("\n");
        this.show("success", string);
    }
}
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