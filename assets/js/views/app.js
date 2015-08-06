var CommentView = Backbone.View.extend({
 // tagName: 'li',

  template: AppTemplates.comment,

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  events: {
    'change .toggle': 'toggleDone',
    'click .destroy': 'burnItWithFire'
  },

  render:function() {

    var html = this.template(this.model.toJSON());
    this.$el.html(html);
    this.$el.toggleClass('completed', this.model.get('done'));
    return this;
  },

  toggleDone: function() {
    this.model.set('done', !this.model.get('done'));
    this.model.save();
  },

  burnItWithFire: function() {
    var _this = this;
    this.$el.slideUp(function() {
      _this.model.destroy();
      _this.remove();
    });
  };

 var AppView = Backbone.View.extend({
  template: AppTemplates.app,

  el: '#target',

  initialize: function() {
    this.listenTo(this.collection, 'add reset sync', this.render);

    this.render();
    this.collection.fetch();
  },

  events: {
  //  'submit form': 'addTodo'
  },

  render: function() {
    var html = this.template(this.collection);
    var _this = this;

    this.$el.html(
      html);
    this.collection.forEach(function(comment) {
      var childView = new CommentView({model: comment});

      _this.$el.find('.comment-list').append(childView.render());

    });

    console.info('render');

    this.$('.new-comment').focus();
    return this;
  },

  addComment: function(ev) {
    ev.preventDefault();

    var title = this.$el.find('input').val();
    this.collection.create(new Comment({title: title}));
    this.$el.find('input').val('');
  }
});
