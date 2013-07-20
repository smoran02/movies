// site/js/collections/Movies.js

var app = app || {};

app.Movies = Backbone.Collection.extend({
	model: app.Movie,
	url: '/api/movies'
});