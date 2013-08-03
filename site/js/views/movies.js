// site/js/views/movies.js

var app = app || {};

app.MoviesView = Backbone.View.extend({

	el: '#movies',

	events: {
		'click #add': 'addMovie'
	},

	initialize: function( initialMovies ){
		this.collection = new app.Movies();
		this.collection.fetch({reset: true});
		this.render();

		this.listenTo( this.collection, 'add', this.renderMovie );
		this.listenTo( this.collection, 'reset', this.render );
	},

	render: function(){
		this.collection.each(function(item){
			this.renderMovie(item);
		}, this);
	},

	renderMovie: function( item ){
		var view = new app.MovieView({ model: item });
		this.$el.append(view.render().el);
	},

	addMovie: function( e ) {
	    e.preventDefault();

	    var formData = {};

	    $( '#addMovie div' ).children( 'input' ).each( function( i, el ) {
	        if ( $( el ).val() != '' )
	        {
	            if ( el.id === 'genres' ) {
	                formData[ el.id ] = [];
	                _.each( $( el ).val().split( ',' ), function( genre ) {
	                    formData[ el.id ].push({ 'genre': genre });
	                });
	            } else if ( el.id == 'leadActors' ) {
	            	formData[ el.id ] = [];
	            	_.each( $( el ).val().split( ',r(' ), function( leadActor ) {
	            	    formData[ el.id ].push({ 'leadActor': leadActor });
	            	});
	            } else if ( el.id === 'releaseDate' ) {
	                formData[ el.id ] = $( '#releaseDate' ).datepicker( 'getDate' ).getTime();
	            } else {
	                formData[ el.id ] = $( el ).val();
	            }
	        }
	        
	        $( el ).val('');
	    });

	    this.collection.create( formData );
	},

});