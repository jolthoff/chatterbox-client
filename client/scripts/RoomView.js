var RoomView = Backbone.View.extend({
  tagName: 'ul',

  render: function() {
    _.each(rooms, function(room) {
      if (room) {
        this.$el.append($('<li></li>').text(room));
      }
    }.bind(this))
    return this;
  }

})