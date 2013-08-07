angular.module( 'littledragon', ['ui.bootstrap'] )
    .config( ['$routeProvider', '$httpProvider',
              function ( $routeProvider, $httpProvider )
              {
                  $routeProvider.
                      when( '/login', {templateUrl: 'login', controller: LoginCtrl} ).
                      when( '/welcome', {templateUrl: 'welcome'} ).
                      when( '/users', {templateUrl: 'users', controller: UsersCtrl} ).
                      when( '/user', {templateUrl: 'user', controller: UserCtrl} ).
                      when( '/edit/user/:id', {templateUrl: 'user', controller: UserCtrl} ).
                      when( '/parents', {templateUrl: 'parents', controller: ParentsCtrl} ).
                      when( '/children', {templateUrl: 'children', controller: ChildrenCtrl} ).
                      otherwise( {redirectTo: '/login'} );

                  var interceptor = ['$rootScope', '$location', '$q', function ( $rootScope, $location, $q )
                  {
                      function success( response )
                      {
                          $rootScope.error = null;
                          return response;
                      }

                      function error( response )
                      {
                          $rootScope.error = null;
                          if ( response.status === 401 )
                          {
                              $location.path( '/login' );
                              return $q.reject( response );
                          }
                          else
                          {
                              return $q.reject( response );
                          }
                      }

                      return function ( promise )
                      {
                          return promise.then( success, error );
                      }
                  }];
                  $httpProvider.responseInterceptors.push(interceptor);
              }] )
    .run( ['$rootScope', '$location', '$http',
           function ( $rootScope, $location, $http )
           {
               $rootScope.user = {user:null, loggedIn:false};
               $http.get("/currentUser" ).success(
                   function(user){
                     if( null != user._id )
                     {
                         $rootScope.user.user = user;
                         $rootScope.user.loggedIn = true;
                     }
                   } );
               $rootScope.$on( "$routeChangeStart", function ( event, next, current )
               {
                   //$rootScope.error = null;
                   //$location.path( '/login' );
               } );
           }] );
