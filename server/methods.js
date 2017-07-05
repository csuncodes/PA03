Meteor.methods({
  'com.insert':function(com) {
     Comments.insert(com);
   },

   'com.remove':function(com){
     console.log("userid="+this.userId);
     console.log('comment.owner='+com.owner);
     if(this.userId == com.owner)
     Comments.remove(com);
   },

    'com.edit':function(id,newComments){
     console.log("new comments: "+newComments);
     console.log("id passed in method:"+id)
     var com = Comments.findOne(id);
     console.log("com:"+com.comments);
     Comments.update(com._id, {$set:{comments:newComments}});
     console.log("new com.comments:"+com.comments);
   },
  'chore.insert': function(chore) {
    People.remove({owner:chore.owner});
    People.insert(chore);
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

  'chore.edit': function(id,newChore){
    var cho = chore.findOne(id);
    chore.update(chore._id, {$set:{chores:newChore}});
  }


});
