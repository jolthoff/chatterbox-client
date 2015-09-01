  window.activeRoom = '';
  window.rooms = {};
  window.friends = {};
  window.username = localStorage.getItem('username') || '';
  window.stored = false;

/*  window.post = function(data) {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(data), 
      contentType: 'application/json',
      success: function() {
        console.log("posted!");
      },
      error: function (data) {
        console.log(data)
      }
    })
  }*/

///// BACKBONE
  var pageView;
  var chatCollection = new ChatCollection();

  chatCollection.loadMsgs(function(data) {
    pageView = new PageView();
  });


