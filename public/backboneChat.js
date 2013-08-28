var Message = Backbone.Model.extend({
  initialize: function(text){
    this.set({text: text});
  }

});



var MessageView = Backbone.View.extend({
  initialize: function(){
    this.render();
  },
  render: function(){
    var html = "<div>" + this.model.escape('text') + "</div>";
    $('body').append(this.$el.html(html));
  }
});


var Messages = function(){
};

Messages.getMessages = function(){
  $.ajax('http://127.0.0.1:8080/1/classes/messages', {
    type: "GET",
    contentType: "application/json",
    success: function(data){
      $('body div').remove();
      _.each(data.results, function(result){
        var message = new Message(result.text);
        var messageView = new MessageView({model: message});
      });
    }
  });
};