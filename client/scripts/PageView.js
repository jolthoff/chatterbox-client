var PageView = Backbone.View.extend({
  el: 'body',

  initialize: function() {
    this.roomView = new RoomView();
    this.roomView.render();
    this.$el.find('.room-window').append(this.roomView.$el);
    this.chatView = new ChatView();
    this.$el.find('.chat-window').append(this.chatView.$el)
    this.friendView = new FriendView();
    this.$el.find('.friend-window').append(this.friendView.$el)

    this.listenTo(chatCollection, 'add', function() {
      this.roomView.render();
      this.chatView.render(chatCollection.filterByRoom(activeRoom));
    });
  },

  render: function() {
    // this.$el.append(new RoomView().render())
  },

  events: {
    "click .post": function() {
      var message = $('.write').val();
      $('.write').val('');

      var newRoom = $('.make-room').val();
    
      var data = {
        username: username,
        text: message,
        roomname: newRoom === '' ? activeRoom : newRoom
      }
      console.log(data);
      post(data);
      fetch();
    },
    "click .username": function(event) {
      friends[$(event.target).text()] = friends[$(event.target).text()] + 1 || 1
      this.friendView.render()
    },

    "click .rooms": function(event) {
      activeRoom = $(event.target).text();
      var msgArray = chatCollection.filterByRoom($(event.target).text());
      this.chatView.render(msgArray);
    }
  }

})