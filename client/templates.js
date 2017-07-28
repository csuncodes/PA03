Template.showpeople.helpers({
  peoplelist() {return People.find()},
})

Template.body.onCreated(function() {
  Meteor.subscribe('people');
});


Template.addperson.events({
  'click button'(elt,instance){
    const name = instance.$('#nombre').val();
    //const year = instance.$('#book').val();
    //const birthyear = parseInt(year);
    const book = instance.$('#book').val();
    const food = instance.$('#food').val();
    const date = instance.$('#date').val();
    const num = instance.$('#num').val();
    console.log('adding'+name);

    instance.$('#nombre').val("");
    instance.$('#book').val("");
    instance.$('#date').val("");
    instance.$('#num').val("");
    var chore = {name:name, food:food, date:date, num:num, owner:Meteor.userId(), createAt:new Date()};
    //People.insert({name:name, food:food, date:date, num:num, owner:Meteor.userId(), createAt:new Date()});
    //People.insert({name,birthyear})
    Meteor.call('chore.update',chore);
  }
})
Template.personrow.helpers({
  isOwner() {console.dir(this);
    return this.person.owner == Meteor.userId()}
})


Template.personrow.events({
  'click span'(elt,instance){
    console.dir(this);
    console.log(this.person._id);
    Meteor.call('chore.remove',this.person,
      (err,res) => {
        console.log('got the answer');
        console.dir([err,res]);
      }
    );
  }
})





Template.showpost.helpers({
  postlist() {return Post.find()},
})

Template.addpost.events({
  'click button'(elt,instance){

    const des = instance.$('#des').val();


    instance.$('#des').val("");

    var listing = {des:des};
    //People.insert({name:name, food:food, date:date, num:num, owner:Meteor.userId(), createAt:new Date()});
    //People.insert({name,birthyear})

    Meteor.call('listing.insert',listing,
  );
  }
})
Template.postrow.helpers({
  isOwner() {console.dir(this);
    return this.post.owner == Meteor.userId()}
})


Template.postrow.events({
  'click span'(elt,instance){
    console.dir(this);
    console.log(this.post._id);
    Meteor.call('listing.remove',this.post,
      (err,res) => {
        console.log('got the answer');
        console.dir([err,res]);
      }
    );
  }
})
