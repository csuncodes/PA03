Meteor.publish('bios',function(){
  return Bios.find();
})

Meteor.publish('people',function(){
  return People.find();
})

Meteor.publish('chats',function(){
  return Chats.find();
})
