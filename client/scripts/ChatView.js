var ChatView = Backbone.View.extend({
  tagName: 'ul',
  className: 'chat',

  render: function() {
    var roomMessages = chatCollection.filterByRoom(activeRoom);
    var maxMsg = 15;
    this.$el.empty()
    roomMessages.forEach(function(message) {
      if (!maxMsg) {
        return;
      }
      
      maxMsg--;
      var post = new MessageView({model: message}).render().$el;
      if (friends[message.get('username')]) {
        post.addClass('friend-post');
      }
      this.$el.prepend(post);
    }.bind(this))
    return this;
  }

})