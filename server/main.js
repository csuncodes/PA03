import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  People.remove({});  // clear the database
  People.insert({name:'Tim',food: "Japanese", date: "07/07/2017", num: "5"});
  People.insert({name:'Caitlin',food:"Chinese", date: "09/12/2017", num: "3"});
  Comments.insert({name:'Claire', comment: "This is great"});
});
