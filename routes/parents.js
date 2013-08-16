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
                 models.parents.findById( req.params.id ).populate( "_children" ).exec( render( req, res ) );
             } );

    app.get( "/parents/user", auth.restrict,
             function ( req, res )
             {
                 models.parents.find().populate( "_user" ).exec( render( req, res ) );
             } );

    app.get( "/parents/:id/user", auth.restrict,
             function ( req, res )
             {
                 models.parents.findById( req.params.id ).populate( "_user" ).exec( render( req, res ) );
             } );

    app.put( "/parents/:id/user", auth.restrict,
             function( req, res )
             {
                 var userId = req.body._user._id;
                 delete req.body._user._id;
                 models.users.update( {_id: userId}, req.body._user, {multi: false}, render( req, res ) );
             });

    app.post( "/parents/user", auth.restrict,
              function ( req, res )
              {
                  new models.users( req.body._user ).save(
                      function ( err, data )
                      {
                          if ( null != err )
                          {
                              res.status( 500 ).send( err.message );
                          }
                          else
                          {

                              new models.parents( {_user: data._id } ).save( render( req, res ) );
                          }
                      } );
              } );
};