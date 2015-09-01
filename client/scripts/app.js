  window.activeRoom = '';
  window.rooms = {};
  window.friends = {};
  window.username = localStorage.getItem('username') || '';
  window.stored = false;
  

  window.fetch = function() {
     return $.ajax({
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
        chatCollection.add(messages);

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
    $('.dropdown').on('click', function() {
      $(this).find('.room-select').toggle();
    })

    $('.dropdown').on('click', '.room-select', function(event) {
      console.log('handler triggered');
      console.log(event);
      activeRoom = $(event.target).text();
      fetch();

    });

    



})

  ///// BACKBONE
  var pageView;
  var chatCollection = new ChatCollection();


  var request = fetch();
  request.done(function(data) {
    pageView = new PageView();
  });


