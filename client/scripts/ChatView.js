var ChatView = Backbone.View.extend({
  tagName: 'ul',
  className: 'chat',

  render: function(roomMessages) {
    this.$el.empty()
    roomMessages.forEach(function(message) {
      this.$el.append(new MessageView({model: message}).render().$el)
    }.bind(this))
    return this;
  }

})