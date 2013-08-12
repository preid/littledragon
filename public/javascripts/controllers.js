function LoginCtrl( $rootScope, $scope, $http, $location, flash )
{
    $scope.login = function ()
    {
        $http.post( "/login", {username: $scope.username, password: $scope.password } )
            .success(
            function ( data )
            {
                $rootScope.user.user = data;
                $rootScope.user.loggedIn = true;
                $location.path( "/welcome" )
            } )
            .error(
            function ()
            {
                flash.now().err = "Login failed";
            }
        );
    };
}

function NavCtrl( $rootScope, $scope )
{
    $scope.user = $rootScope.user
}

function UsersCtrl( $rootScope, $scope, $http, flash )
{
    var load = function ()
    {
        $http.get( "/rest/users" )
            .success(
            function ( users )
            {
                $scope.users = users;
            }
        );
    };
    load();

    $scope.delete = function ( id )
    {
        $http.delete( "/rest/users/" + id )
            .success(
            function ()
            {
                load();
                flash.now().okay = "User deleted";
            } )
            .error(
            function ( data, code )
            {
                flash.now().err = "Failed to delete User: " + data + " [code:  " + code + "]";
            } );
    };
}

function UserCtrl( $rootScope, $scope, $http, $location, $routeParams, flash )
{
    $scope.buttonText = "Create";
    if ( null != $routeParams.id )
    {
        $http.get( "/rest/users/" + $routeParams.id )
            .success(
            function ( user )
            {
                $scope.user = user;
            }
        );
        $scope.buttonText = "Update";
        flash.add().info = "Update User details";
    }
    else
    {
        flash.add().info = "Create a new User"
    }

    $scope.submit = function ()
    {
        if ( null != $scope.user._id )
        {
            $http.put( "/rest/users/" + $scope.user._id, $scope.user )
                .success(
                function ()
                {
                    $location.path( "/users" );
                    flash.add().okay = "User updated";
                    $scope.user = null;
                    $scope.userForm.$setPristine();
                } )
                .error(
                function ( data, code )
                {
                    flash.now().err = "Failed to update User: " + data + " [code:  " + code + "]";
                } );
        }
        else
        {
            $http.post( "/rest/users", $scope.user )
                .success(
                function ()
                {
                    $location.path( "/users" );
                    flash.add().okay = "User created";
                    $scope.user = null;
                    $scope.userForm.$setPristine();
                } )
                .error(
                function ( data, code )
                {
                    flash.now().err = "Failed to create User: " + data + " [code:  " + code + "]";
                } );
        }
    };
}

function ParentsCtrl( $scope, $http )
{
    $http.get( "/rest/parents_user" )
        .success(
        function ( parents )
        {
            $scope.parents = parents;
        }
    );
}

function ChildrenCtrl( $scope, $http )
{
    $http.get( "/rest/children" )
        .success(
        function ( children )
        {
            $scope.children = children;
        }
    );
}