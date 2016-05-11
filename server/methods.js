Meteor.methods({
  createChat: function(userId, otherId) {
    return Chats.insert({user1Id:userId , user2Id: otherId});
  },
  updateChat: function(chat) {
    Chats.update(chat._id, chat);
  }
});
