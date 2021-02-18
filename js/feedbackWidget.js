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