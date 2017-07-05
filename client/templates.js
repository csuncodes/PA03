Template.show_comments.helpers({
  commentslist() {return Comments.find()},
})

Template.add_comments.events({
  'click button[id=addComments]'(elt,instance) {
    const username = instance.$('#username').val();
    const comments = instance.$('#comments').val();
    console.log('adding '+username);
    instance.$('#username').val("");
    instance.$('#comments').val("");
    var com ={ username:username,
                comments:comments,
                owner:Meteor.userId()
              };
    Meteor.call('com.insert',com);
    //People.insert({name,birthyear})
  }
})

Template.comments_row.helpers({
  owner() {console.dir(this);
    return this.comments.owner==Meteor.userId()}
})
Template.comments_row.events({
     'click span'(elt,instance){
    //  console.dir(this);
      //console.log(this);
      console.log(this.comments._id);
      Meteor.call('com.remove',this.comments);
    }
})

// Template.comments_row.onCreated(function(){
//   this.Dict = new ReactiveDict();
//   this.Dict.set("Editing",false);
//   this.Dict.set("id");
// })
Template.comments_row.onCreated(function comments_row_OnCreated() {
  // counter starts at 0
  this.Editing= new ReactiveVar(false);
});


Template.comments_row.events({
     'click button[id=enableEdit]'(event,instance){
        // Template.instance().Dict.set("Editing", true);
        // console.log(this._id);
        // console.log(this.comments._id);
        // console.dir(this);
        // console.dir(event);
        // console.dir(instance);
        instance.Editing.set(true);
        console.log(instance.Editing.get());
      // Editing = false;
    }
})

Template.comments_row.events({
     'click button[id=editComments]'(elt,instance){
      const oldComments = this.comments.comments;
      const newComments = instance.$('#newComments').val();
      const username = this.comments.username;
      console.log("this id:"+this._id);
      console.log("this comment id:"+this.comments._id);
      console.log("old comments: "+oldComments);
      console.log("new comments: "+newComments);
      console.log("this comments: "+this.comments);
      var id = this.comments._id;
      console.log("var id:"+id);
      // var com ={ username:username,
      //             comments:comments,
      //             owner:Meteor.userId()
      //           };

      Meteor.call('com.edit',id,newComments);
      instance.Editing.set(false);
    // Template.instance().Dict.set("Editing", false);
    }
})
Template.comments_row.helpers({
  counter() {
    return Template.instance().counter.get();
  },

  isEditing() {
    return Template.instance().Editing.get();

  }

    //&& this._id=id
})

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
    Meteor.call('chore.insert',chore);
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
