
Meteor.methods({

  'chore.insert': function(chore) {
    
    People.insert(chore);
  },
  'chore.update'(chore){//updating the name
    if (People.findOne({'name':chore.name})) {
      People.update({'name':chore.name}, {
        $set: { 'num': chore.num, 'food': chore.food, 'date':chore.date }
      });
    } else {
      Meteor.call('chore.insert',chore);
    }
  },
  'chore.remove': function(chore){
    console.log("userid="+this.userId);
    console.log('chore.owner='+chore.owner);
    console.dir(chore);
    if (this.userId == chore.owner)
       People.remove(chore._id);
  },

  'listing.insert': function(listing) {
    Post.remove({owner:listing.owner});
    Post.insert(listing);
  },

  'listing.remove': function(listing){
    console.log("userid="+this.userId);
    console.log('chore.owner='+listing.owner);
    console.dir(listing);

       Post.remove(listing._id);
       // Post = People    listing = chore
  },

    'chatlog.insert': function(chatline) {

      Chats.insert(chatline);
    },

});
