var FriendView = Backbone.View.extend({
  tagName: 'ul',

  initialize: function() {},

  render: function() {
    this.$el.empty();
    _.each(friends, function(friendliness, friend) {
      var lineItem= $('<li class="friend"></li>');
      lineItem.text(friend);
      lineItem.append($('<span class="remove-friend">X</span>'));
      
      this.$el.append(lineItem);
    }.bind(this));
  }
})