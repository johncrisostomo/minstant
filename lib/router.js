  Router.configure({
    layoutTemplate: 'ApplicationLayout'
  });
  Router.route('/', function () {
    console.log("rendering root /");
    this.render("navbar", {to:"header"});
    this.render("lobby_page", {to:"main"});
  }, {
    waitOn: function() {
      return Meteor.subscribe('users');
    }
  });

  Router.route('/chat/:_id', function () {
    var otherUserId = this.params._id;
    var filter = {$or:[
                {user1Id:Meteor.userId(), user2Id:otherUserId},
                {user2Id:Meteor.userId(), user1Id:otherUserId}
                ]};
    var chat = Chats.findOne(filter);
    if (!chat){
      var chatId;
      Meteor.call('createChat', Meteor.userId(), otherUserId, function(err, res){
        if (!err) {
          chatId = res;
        }
      });
    }
    else {
      chatId = chat._id;
    }
    if (chatId){
      Session.set("chatId",chatId);
    }
    this.render("navbar", {to:"header"});
    this.render("chat_page", {to:"main"});
    this.subscribe('chats', Meteor.userId());
    this.subscribe('emojis');
  }, {
    waitOn: function() {
      return [
        Meteor.subscribe('chats', Meteor.userId()),
        Meteor.subscribe('emojis')
      ];
    }
  });
