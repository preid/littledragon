module.exports = function ( app, auth, models )
{
    Object.getOwnPropertyNames( models ).forEach(
        function ( modelName )
        {
            app.get( "/" + modelName, auth.restrict, function ( req, res )
            {
                models[modelName].find( {}, function ( err, data )
                {
                    res.json( data );
                } );
            } );

            app.get( "/" + modelName + "/:id", auth.restrict, function ( req, res )
            {
                models[modelName].findById( req.params.id,
                                            function ( err, data )
                                            {
                                                res.json( data );
                                            } );
            } );

            app.del( "/" + modelName + "/:id", auth.restrict, function ( req, res )
            {
                models[modelName].remove( { _id: req.params.id },
                                          function ( err, data )
                                          {
                                              res.json( data );
                                          } );
            } );

            app.post( "/" + modelName, auth.restrict, function ( req, res )
            {
                new models[modelName]( req.body ).save(
                    function ( err, data )
                    {
                        if( null != err )
                            res.send( err );
                        else
                            res.json( data );
                    } );
            } );

            app.put( "/" + modelName + "/:id", auth.restrict, function ( req, res )
            {
                models[modelName].update( {_id: req.params.id}, req.body, {multi: false},
                                          function ( err, data )
                                          {
                                              res.json( data );
                                          } );
            } );
        } );
};