// site/js/models/Movie.js

var app = app || {};

app.Movie = Backbone.Model.extend({

	defaults: {
		movieImage: 'img/placeholder.jpg',
		title: 'No title',
		genres: 'No genres',
		leadActors: 'No actors',
		releaseDate: new Date(),
		rating: -1
	},

	parse: function( response ) {
		response.id = response._id;
		return response;
	},

	perfect: function() {
		return this.get( 'rating' ) == 5;
	},

	zero: function() {
		return this.get( 'rating' ) == 0;
	}

});