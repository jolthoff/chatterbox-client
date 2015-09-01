var FriendView = Backbone.View.extend({
  tagName: 'ul',

  initialize: function() {},

  render: function() {
    this.$el.empty();
    _.each(friends, function(friendliness, friend) {
      this.$el.append($('<li class="friend"></li>').text(friend))
    }.bind(this));
  }
})