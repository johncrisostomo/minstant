  Template.chat_page.helpers({
    messages:function(){
      var chat = Chats.findOne({_id:Session.get("chatId")});
      if (chat) {
        return chat.messages;
      } else {
        return;
      }
    },
    other_user:function(){
      return ""
    }
  });

  Template.chat_message.helpers({
    ownMessage: function() {
      return this.userid === Meteor.userId();
    }
  });

 Template.chat_page.events({
  'submit .js-send-chat':function(event){
    event.preventDefault();
    var chat = Chats.findOne({_id:Session.get("chatId")});
    if (chat){
      var msgs = chat.messages;
      if (!msgs){
        msgs = [];
      }
      msgs.push({text: event.target.chat.value,
        username:Meteor.user().profile.username,
        avatar:Meteor.user().profile.avatar,
        userid:Meteor.userId()});
      event.target.chat.value = "";
      chat.messages = msgs;
      Meteor.call('updateChat', chat);
    }
  }
});
