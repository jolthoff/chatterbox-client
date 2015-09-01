var MessageView = Backbone.View.extend({
  tagName: 'li',
  className: 'message',

  render: function() {
    this.$el.append($('<span class="username"></span>').text(this.model.get('username')));
    this.$el.append($('<p class="message"></p>').text(this.model.get('text')));
    this.$el.append($('<span class="time"></span>').text(this.model.get('createdAt')));
    return this;
  },

  events: {
    "click .username": function() {}
  }

})