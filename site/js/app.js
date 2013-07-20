// site/app.toJSON

var app = app || {};

$(function(){
	$( '#releaseDate' ).datepicker();
	new app.MoviesView();
});