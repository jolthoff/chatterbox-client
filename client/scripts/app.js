  window.activeRoom = '';
  window.rooms = {};
  window.friends = {};
  window.username = localStorage.getItem('username') || '';
  window.createdRoom = false;
  window.docked = [];

///// BACKBONE
  var pageView;
  var chatCollection = new ChatCollection();

  chatCollection.loadMsgs(function(data) {
    pageView = new PageView();
  });


