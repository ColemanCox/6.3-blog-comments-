var Comment = Backbone.Model.extend({
  //idAttribute: '_id',
  defaults: {
    title: '',
    done: false
  }

});

var CommentList = Backbone.Collection.extend({
  model: Comment,
  url: 'http://tiny-lr.herokuapp.com/collections/cc-todos'
});
