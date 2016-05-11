Meteor.methods({
  updateChat: function(chat) {
    Chats.update(chat._id, chat);
  }
});
