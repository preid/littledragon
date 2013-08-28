module.exports = function ( app, auth, models, render )
{
    app.get( "/parents", auth.restrict, function ( req, res )
    {
        res.render( "parents" );
    } );

    app.get( "/parent", auth.restrict, function ( req, res )
    {
        res.render( "parent" );
    } );

    app.get( "/parents/:id/children", auth.restrict,
             function ( req, res )
             {
                 models.Parent.find( req.params.id, {include: [models.Child]} ).complete( render( req, res ) );
             } );

    app.get( "/parents/user", auth.restrict,
             function ( req, res )
             {
                 models.Parent.findAll( {include: [models.User]} ).complete( render( req, res ) );
             } );

    app.get( "/parents/:id/user", auth.restrict,
             function ( req, res )
             {
                 models.Parent.find( { where: {id: req.params.id}, include: [models.User] } ).complete( render( req, res ) );
             } );

    app.put( "/parents/:id/user", auth.restrict,
             function( req, res )
             {
                 models.User.update( req.body.user, {id: req.body.user.id} ).complete( render( req, res ) );
             });

    app.post( "/parents/user", auth.restrict,
              function ( req, res )
              {
                  models.User.create( req.body.user ).complete(
                      function ( err, data )
                      {
                          if ( null != err )
                          {
                              res.status( 500 ).send( err.message );
                          }
                          else
                          {
                              models.Parent.create( {UserId: data.id } ).complete( render( req, res ) );
                          }
                      } );
              } );
};