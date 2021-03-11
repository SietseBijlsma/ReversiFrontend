class FeedbackWidget{
    constructor(elementId) 
    {
         this._elementId = elementId;
         this.$element = $("#" + this._elementId);
         this.$element.empty();
         this.$element.addClass("feedbackWidget")
         this.$element.append(`
                <div class="feedbackWidget-check">
                    <i class="fas fa-check fa-3x"></i>
                </div>
                
                <div class="feedbackWidget-times">
                    <i class="fas fa-times"></i>
                </div>
                <p class="feedbackWidget-p">something went wrong</p>
                <div class="feedbackWidget-buttons">
                    <button class="button">Akoord</button>
                    <button class="button">Weigeren</button>
                </div>
         `);

         this.$element.find(".feedbackWidget-times").click(function() {
            $("#test").removeClass("active");
          });
    }
    get elementId() 
    { 
         return this._elementId;
    }
    show(type //, message
        )
    {
        // this.$element.html(`<pre>${message}</pre>`);
        // this.$element.css("display", "block");
        if(type == "success") 
        {
            this.$element.removeClass("alert-danger");
            this.$element.addClass("alert-success");
        }
       else {
            this.$element.removeClass("alert-succes");
            this.$element.addClass("alert-danger");
       }   
       this.$element.addClass("active");
    }
    hide() {
        this.$element.removeClass("active");
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