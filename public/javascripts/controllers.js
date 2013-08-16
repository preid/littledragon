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
    var load = function ()
    {
        $http.get( "/parents/user" )
            .success(
            function ( parents )
            {
                $scope.parents = parents;
            }
        );
    };
    load();

    $scope.delete = function ( id )
    {
        $http.delete( "/rest/parent/" + id )
            .success(
            function ()
            {
                load();
                flash.now().okay = "Parent deleted";
            } )
            .error(
            function ( data, code )
            {
                flash.now().err = "Failed to delete Parent: " + data + " [code:  " + code + "]";
            } );
    };
}

function ParentCtrl( $rootScope, $scope, $http, $location, $routeParams, flash )
{
    $scope.buttonText = "Create";
    if ( null != $routeParams.id )
    {
        $http.get( "/parents/" + $routeParams.id + "/user" )
            .success(
            function ( parent )
            {
                $scope.parent = parent;
            }
        );
        $scope.buttonText = "Update";
        flash.add().info = "Update Parent details";
    }
    else
    {
        flash.add().info = "Create a new Parent"
    }

    $scope.submit = function ()
    {
        if ( null != $scope.parent._id )
        {
            $http.put( "/parents/" + $scope.parent._id + "/user", $scope.parent )
                .success(
                function ()
                {
                    $location.path( "/parents" );
                    flash.add().okay = "Parent updated";
                    $scope.parent = null;
                    $scope.parentForm.$setPristine();
                } )
                .error(
                function ( data, code )
                {
                    flash.now().err = "Failed to update Parent: " + data + " [code:  " + code + "]";
                } );
        }
        else
        {
            $http.post( "/parents/user", $scope.parent )
                .success(
                function ()
                {
                    $location.path( "/parents" );
                    flash.add().okay = "Parent created";
                    $scope.parent = null;
                    $scope.parentForm.$setPristine();
                } )
                .error(
                function ( data, code )
                {
                    flash.now().err = "Failed to create Parent: " + data + " [code:  " + code + "]";
                } );
        }
    };
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