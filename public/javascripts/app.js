var app = angular.module( 'littledragon', ['ui.bootstrap'] );
app.config( ['$routeProvider', '$httpProvider',
             function ( $routeProvider, $httpProvider )
             {
                 $routeProvider.
                     when( '/login', {templateUrl: 'login', controller: LoginCtrl} ).
                     when( '/welcome', {templateUrl: 'welcome'} ).
                     when( '/users', {templateUrl: 'users', controller: UsersCtrl} ).
                     when( '/user', {templateUrl: 'user', controller: UserCtrl} ).
                     when( '/edit/user/:id', {templateUrl: 'user', controller: UserCtrl} ).
                     when( '/parents', {templateUrl: 'parents', controller: ParentsCtrl} ).
                     when( '/parent', {templateUrl: 'parent', controller: ParentCtrl} ).
                     when( '/edit/parent/:id', {templateUrl: 'parent', controller: ParentCtrl} ).
                     when( '/facilities', {templateUrl: 'facilities', controller: FacilitiesCtrl} ).
                     when( '/facility', {templateUrl: 'facility', controller: FacilityCtrl} ).
                     when( '/edit/facility/:id', {templateUrl: 'facility', controller: FacilityCtrl} ).
                     when( '/children', {templateUrl: 'children', controller: ChildrenCtrl} ).
                     otherwise( {redirectTo: '/login'} );

                 var interceptor = ['$rootScope', '$location', '$q', function ( $rootScope, $location, $q )
                 {
                     function success( response )
                     {
                         return response;
                     }

                     function error( response )
                     {
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
                 $httpProvider.responseInterceptors.push( interceptor );
             }] )
    .run( ['$rootScope', '$location', '$http',
           function ( $rootScope, $location, $http )
           {
               $rootScope.user = {user: null, loggedIn: false};
               $http.get( "/currentUser" ).success(
                   function ( user )
                   {
                       if ( null != user.id )
                       {
                           $rootScope.user.user = user;
                           $rootScope.user.loggedIn = true;
                       }
                   } );
           }] );

app.factory( "flash", function ( $rootScope )
{
    var queue = {}, message = {};

    $rootScope.$on( '$routeChangeSuccess', function ()
    {
        Object.getOwnPropertyNames( message ).forEach(
            function ( messageName )
            {
                delete message[messageName];
            } );
        Object.getOwnPropertyNames( queue ).forEach(
            function ( queueName )
            {
                message[queueName] = queue[queueName];
                delete queue[queueName];
            } );
    } );

    var fl = {
        now: function ()
        {
            return message
        },
        add: function ()
        {
            return queue
        },
        err: function ()
        {
            return message.err
        },
        warn: function ()
        {
            return message.warn
        },
        okay: function ()
        {
            return message.okay
        },
        info: function ()
        {
            return message.info
        } };
    $rootScope.flash = fl;
    return fl;
} );
