// site/js/views/movie.js

var app = app || {};

app.MovieView = Backbone.View.extend({

	tagName: 'div',

	className: 'movieContainer',

	template: _.template($('#movieTemplate').html()),

	events: {
		'click .delete': 'deleteMovie'
	},

	render: function(){
		if ( this.model.perfect() ) {
			this.$el.addClass( 'perfect' );
		} else if ( this.model.zero() ) {
			this.$el.addClass( 'zero' );
		}
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	deleteMovie: function(){
		this.model.destroy();
		this.remove();
	}

});