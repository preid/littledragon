module.exports = function ( app, auth, models, render )
{
    Object.getOwnPropertyNames( models ).forEach(
        function ( modelName )
        {
            app.get( "/rest/" + modelName, auth.restrict, function ( req, res )
            {
                models[modelName].find( {}, render( req, res ) );
            } );

            app.get( "/rest/" + modelName + "/:id", auth.restrict, function ( req, res )
            {
                models[modelName].findById( req.params.id, render( req, res ) );
            } );

            app.del( "/rest/" + modelName + "/:id", auth.restrict, function ( req, res )
            {
                models[modelName].remove( { _id: req.params.id }, render( req, res ) )
            } );

            app.post( "/rest/" + modelName, auth.restrict, function ( req, res )
            {
                new models[modelName]( req.body ).save( render( req, res ) );
            } );

            app.put( "/rest/" + modelName + "/:id", auth.restrict, function ( req, res )
            {
                delete req.body._id;
                models[modelName].update( {_id: req.params.id}, req.body, {multi: false}, render( req, res ) );
            } );
        }
    )
    ;
}
;