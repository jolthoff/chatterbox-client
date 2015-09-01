var ChatView = Backbone.View.extend({
  tagName: 'ol',
  className: 'chat',

  render: function(roomMessages) {
    var maxMsg = 15;
    this.$el.empty()
    roomMessages.forEach(function(message) {
      if (!maxMsg) {
        return;
      }
      maxMsg--;
      this.$el.prepend(new MessageView({model: message}).render().$el)
    }.bind(this))
    return this;
  }

})