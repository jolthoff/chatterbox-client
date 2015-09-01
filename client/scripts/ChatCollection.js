var ChatCollection = Backbone.Collection.extend({
  model: MessageModel,

  filterByRoom: function(roomName) {
    return this.filter(function(model) {
      return model.get('roomname') === roomName;
    });
  }

})