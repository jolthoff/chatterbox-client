var PageView = Backbone.View.extend({
  el: 'body',

  initialize: function() {
    var roomView = new RoomView();
    roomView.render();
    this.$el.append(roomView.$el);
    var chatView = new ChatView();
    this.$el.find('.chat-window').append(chatView.$el)

    this.$el.delegate('li', 'click', function() {
      var msgArray = chatCollection.filterByRoom($(this).text());
      chatView.render(msgArray);
    });
  },

  render: function() {
    this.$el.append(new RoomView().render())
  }

})