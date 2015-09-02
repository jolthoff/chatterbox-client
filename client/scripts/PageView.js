var PageView = Backbone.View.extend({
  el: 'body',

  initialize: function() {
    this.roomView = new RoomView();
    this.roomView.render();
    this.roomView.$el.hide();
    this.$el.find('.room-window').append(this.roomView.$el);
    this.chatView = new ChatView();
    this.$el.find('.chat-window').append(this.chatView.$el)
    this.friendView = new FriendView();
    this.$el.find('.friend-window').append(this.friendView.$el)
    this.friendView.$el.hide();

    if (username.length > 0) {
      $('.controls').removeAttr('hidden');
      $('.login').hide();
    }

    this.listenTo(chatCollection, 'sync', function() {
      this.roomView.render();
      this.chatView.render();
    });
  },

  postHandler: function() {
    var message = $('.write').val();
      $('.write').val('');

      if (message.length !== 0) {
        var data = {
          username: username,
          text: message,
          roomname: activeRoom
        }
        console.log(data);
        chatCollection.create(data);
      }
      chatCollection.loadMsgs();
      this.roomView.render();
      this.chatView.render();
      $('.current-room').text(activeRoom);
  },

  events: {
    "click .post": "postHandler",

    "keypress .write": function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        this.postHandler();
      }
    },

    "keypress .login": function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        localStorage.setItem('username', event.target.value)
        username = localStorage.getItem('username');
        $('.controls').show();
        $('.login input').val('');
        $('.login').hide();
      }
    },

    "click .logout": function(event) {
      username = '';
      localStorage.removeItem('username');
      $('.controls').hide();
      $('.login').show();
    },

    "click .username": function(event) {
      friends[$(event.target).text()] = friends[$(event.target).text()] + 1 || 1
      this.friendView.render()
      this.chatView.render()
    },

    "click .rooms": function(event) {
      activeRoom = $(event.target).text();
      $('.current-room').text(activeRoom);
      this.chatView.render();
    },

    "click .room-window h1": function(event) {
      this.roomView.$el.slideToggle(200);
      this.roomView.expanded = !this.roomView.expanded;
      $('.expand-room').text(this.roomView.expanded ? '–' : '+');
    },

    "click .remove-friend": function(event) {
      var parent = event.target.parentNode
      delete friends[$(parent).text().slice(0, -1)];
      parent.remove();
      this.chatView.render()
    },

    "click .friend-window h1": function(event) {
      this.friendView.$el.slideToggle(200);
      this.friendView.expanded = !this.friendView.expanded;
      $('.expand-friend').text(this.friendView.expanded ? '–' : '+')
    },

    "click .make-room": function(event) {
      if(!createdRoom) {
        $('.choose-room').show();
        createdRoom = true;
      } else {
        activeRoom = $('.choose-room').val()
        this.postHandler();
        createdRoom = false;
        $('.choose-room').hide();
      }
    }

  }

})