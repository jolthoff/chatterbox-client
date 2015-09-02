var ChatCollection = Backbone.Collection.extend({
  model: MessageModel,
  url: 'https://api.parse.com/1/classes/chatterbox',

  initialize: function() {
    // debugger
    this.on('sync', function(collection) {
      this.each(function(message) {
        var room = message.get('roomname');
        if (!rooms[room]) {
          rooms[room] = room;
        }
      });
    }, this)
  },

  loadMsgs: function(cb) {
    this.fetch({data: {order: '-createdAt'}, success: cb});

  },

  parse: function(response) {
    var array = [];
    for (var i = response.results.length-1; i >= 0; i--) {
      array.push(response.results[i])
    }
    return array;
  },

  filterByRoom: function(roomName) {
    return this.filter(function(model) {
      return model.get('roomname') === roomName;
    });
  },

});