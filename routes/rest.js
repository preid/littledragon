module.exports = function ( app, auth, models, render )
{
    Object.getOwnPropertyNames( models ).forEach(
        function ( modelName )
        {
            app.get( "/rest/" + models[modelName].tableName, auth.restrict, function ( req, res )
            {
                models[modelName].findAll().complete( render( req, res ) );
            } );

            app.get( "/rest/" + modelName + "/:id", auth.restrict, function ( req, res )
            {
                models[modelName].find( req.params.id ).complete( render( req, res ) );
            } );

            app.del( "/rest/" + modelName + "/:id", auth.restrict, function ( req, res )
            {
                models[modelName].destroy( { id: req.params.id } ).complete( render( req, res ) );
            } );

            app.post( "/rest/" + modelName, auth.restrict, function ( req, res )
            {
                models[modelName].create( req.body ).complete( render( req, res ) );
            } );

            app.put( "/rest/" + modelName + "/:id", auth.restrict, function ( req, res )
            {
                //delete req.body._id;
                models[modelName].update( {id: req.params.id}, req.body ).complete( render( req, res ) );
            } );
        }
    )
    ;
}
;