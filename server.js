// server.js

var application_root = __dirname,
	express = require( 'express' ),
	path = require( 'path' ),
	mongoose = require( 'mongoose' );

var app = express();

var uristring = 
process.env.MONGOLAB_URI || 
process.env.MONGOHQ_URL || 
'mongodb://localhost/movie_db';


app.configure( function() { 

	app.use( express.bodyParser() );

	app.use( express.methodOverride() );

	app.use( app.router );

	app.use( express.static( path.join( application_root, 'site' ) ) );

	app.use( express.errorHandler( { dumpExceptions: true, showStack: true } ) );

});

var port = process.env.PORT || 4040;

app.listen( port, function() { 
	console.log( "Express server listening on port %d in %s mode", port, app.settings.env );
});

app.get( '/api', function( request, response ) {
	response.send( 'Movie api is running' );
});

if (err) { 
 console.log ('ERROR connecting to: ' + uristring + '. ' + err);
 } else {
 console.log ('Succeeded connected to: ' + uristring);
 }

var Genres = new mongoose.Schema({
	genre: String
});

var LeadActors = new mongoose.Schema({
	leadActor: String
});

var Movie = new mongoose.Schema({ 
	movieImage: String,
	title: String,
	genres: [ Genres ],
	leadActors: [ LeadActors ],
	releaseDate: Date,
	rating: Number
});

var MovieModel = mongoose.model( 'Movie', Movie );

app.get( '/api/movies', function( request, response ) {
	return MovieModel.find( function( err, movies ) {
		if ( !err ) {
			return response.send( movies );
		} else {
			return console.log( err );
		}
	});
});

app.post( '/api/movies', function( request, response ) {
	var movie = new MovieModel({
		movieImage: request.body.movieImage,
		title: request.body.title,
		genres: request.body.genres,
		leadActors: request.body.leadActors,
		releaseDate: request.body.releaseDate,
		rating: request.body.rating
	});
	movie.save( function( err ) {
		if ( !err ) {
			console.log( 'created' );
		} else {
			console.log ( err );
		}
	});
	return response.send( movie );
});

app.get( '/api/movies/:id', function( request, response ) {
	return MovieModel.findById( request.params.id, function( err, movie ) {
		if ( !err ) {
			return response.send( movie );
		} else {
			console.log ( err );
		}
	});
});

app.put( '/api/movies/:id', function( request, response ) {
	console.log( 'Updating movie ' + request.body.title );
	return MovieModel.findById( request.params.id, function( err, movie ) {
		movie.title = request.body.title;
		movie.genres = request.body.genres;
		movie.leadActors = request.body.leadActors;
		movie.releaseDate = request.body.releaseDate;
		movie.rating = request.body.rating;

		return movie.save( function( err ) {
			if ( !err ) {
				console.log ( 'movie updated' );
			} else {
				console.log( err );
			}
			return response.send( movie );
		});
	});
});

app.delete( '/api/movies/:id', function( request, response ) {
    console.log( 'Deleting movie with id: ' + request.params.id );
    return MovieModel.findById( request.params.id, function( err, movie ) {
        return movie.remove( function( err ) {
            if( !err ) {
                console.log( 'Movie removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});




