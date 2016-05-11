Meteor.publish('users', function() {
  return Meteor.users.find();
});

Meteor.publish('chats', function(userId) {
  return Chats.find({$or: [{user1Id: userId}, {user2Id: userId}]});
});

Meteor.publish('emojis', function() {
  return Emojis.find();
});
