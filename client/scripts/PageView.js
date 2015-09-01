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

    this.listenTo(chatCollection, 'add', function() {
      this.roomView.render();
      this.chatView.render(chatCollection.filterByRoom(activeRoom));
    });
  },

  postHandler: function() {
    var message = $('.write').val();
      $('.write').val('');
      if (message.length === 0) {
        return;
      }
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
      this.chatView.render(chatCollection.filterByRoom(activeRoom))
    },

    "click .rooms": function(event) {
      activeRoom = $(event.target).text();
      $('.current-room').text(activeRoom);
      var msgArray = chatCollection.filterByRoom($(event.target).text());
      this.chatView.render(msgArray);
    },

    "click .room-window h1": function(event) {
      this.roomView.$el.slideToggle(200);
      this.roomView.expanded = !this.roomView.expanded;
      $('.expand-room').text(this.roomView.expanded ? '–' : '+');
    },

    "click .remove-friend": function(event) {
      debugger
      var parent = event.target.parentNode
      delete friends[$(parent).text().slice(0, -1)];
      parent.remove();
      this.chatView.render(chatCollection.filterByRoom(activeRoom))
    },

    "click .friend-window h1": function(event) {
      this.friendView.$el.slideToggle(200);
      this.friendView.expanded = !this.friendView.expanded;
      $('.expand-friend').text(this.friendView.expanded ? '–' : '+')
    }

  }

})