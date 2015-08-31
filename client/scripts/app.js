// YOUR CODE HERE:
  window.activeRoom = '';
  window.rooms = {};
  window.username = "WhoAmI"

  window.fetch = function() {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        var messages = data.results;
        messages.forEach(function(message) {
          if (!rooms[message.roomname]) {
            rooms[message.roomname] = message.roomname
          }
        });

        $('.room-select').remove();
        
        _.each(rooms, function(room) {
          if (!room) return;
          $('#chats').append($('<button class="room-select"></button>').text(room));
        });

        if (!activeRoom) {
          return;
        }

        var displayedChat = messages.filter(function(msg) {
            return msg.roomname === activeRoom;
          });
        $('ul').remove();
        $('.chat-window').append($('<ul class="' + activeRoom + '"></ul>'));
        displayedChat.forEach(function(msg) {
          var $node = $('<li></li>');
          $node.append($('<span class="username"></span>').text(msg.username));
          $node.append($('<p class="message"></p>').text(msg.text));
          $node.append($('<span class="time"></span>').text(msg.createdAt));
          $('ul').append($node);
        });
      },
      error: function(data) {
        console.log(data);
      }
    });
  };

  window.post = function(data) {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(data), 
      contentType: 'application/json',
      success: function() {
        console.log("posted!");
        fetch()
      },
      error: function (data) {
        console.log(data)
      }
    })
  }

  $(document).ready(function() {

    fetch();

    $('body').on('click', '.room-select', function() {
      console.log('handler triggered');
      activeRoom = $(this).text();
      fetch();
    });

    $('.post').on('click', function() {

      var message = $('.write').val();
      $('.write').val('');

      var newRoom = $('.make-room').val();
    
      var data = {
        username: username,
        text: message,
        roomname: newRoom === '' ? activeRoom : newRoom
      }
      post(data);
    });



})