var RoomView = Backbone.View.extend({
  tagName: 'ul',
  className: 'room-list',
  expanded: false,

  initialize: function() {

  },

  render: function() {
    this.$el.empty();
    _.each(rooms, function(room) {
      if (room) {
        this.$el.append($('<li class="rooms"></li>').text(room));
      }
    }.bind(this))
    return this;
  }



})