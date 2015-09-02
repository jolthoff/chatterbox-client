var DockView = Backbone.View.extend({
  el: '#dock',

  render: function() {
    this.$el.empty();
    docked.forEach(function(chat, i) {
      var newButton = $('<button class="docked-chat"></button>');
      newButton.text(chat);
      newButton.attr('data-id', i)
      newButton.append($('<span class="remove-docked">X</span>'));
      this.$el.append(newButton);
    }.bind(this));
  },

  events: {
    "click .docked-chat": function(event) {
        var room = $(event.target).text().slice(0, -1);
        var newChatView = new ChatView();
        var floatingWindow = $('<div class="floater"></div>');
        floatingWindow.attr('data-id', $(event.target).attr('data-id'));
        floatingWindow.append(newChatView.$el);
        newChatView.renderRoom(room);
        $('body').append(floatingWindow);
    },

    "click .remove-docked": function(event) {
      var target = $(event.target);
      var roomName = target.text().slice(0, -1);
      var ix = $(event.target.parentNode).attr('data-id');
      $('div[data-id="' + ix + '"]').remove();
      $(event.target.parentNode).remove();
      docked.splice(ix, 1);
      this.render();
    }
  }
})