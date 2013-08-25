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
        $http.get( "/users/facility" )
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
    $http.get( "/rest/facilities" )
        .success(
        function ( facilities )
        {
            $scope.facilities = facilities;
        }
    );

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
        if ( null != $scope.user.id )
        {
            $http.put( "/rest/users/" + $scope.user.id, $scope.user )
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
        if ( null != $scope.parent.id )
        {
            $http.put( "/parents/" + $scope.parent.id + "/user", $scope.parent )
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

function FacilitiesCtrl( $scope, $http )
{
    var load = function ()
    {
        $http.get( "/rest/facilities" )
            .success(
            function ( facilities )
            {
                $scope.facilities = facilities;
            }
        );
    };
    load();

    $scope.delete = function ( id )
    {
        $http.delete( "/rest/facility/" + id )
            .success(
            function ()
            {
                load();
                flash.now().okay = "Facility deleted";
            } )
            .error(
            function ( data, code )
            {
                flash.now().err = "Failed to delete Facility: " + data + " [code:  " + code + "]";
            } );
    };
}


function FacilityCtrl( $rootScope, $scope, $http, $location, $routeParams, flash )
{
    $scope.buttonText = "Create";
    if ( null != $routeParams.id )
    {
        $http.get( "/rest/facilities/" + $routeParams.id )
            .success(
            function ( facility )
            {
                $scope.facility = facility;
            }
        );
        $scope.buttonText = "Update";
        flash.add().info = "Update Facility details";
    }
    else
    {
        flash.add().info = "Create a new Facility"
    }

    $scope.submit = function ()
    {
        if ( null != $scope.facility.id )
        {
            $http.put( "/rest/facilities/" + $scope.facility.id, $scope.facility )
                .success(
                function ()
                {
                    $location.path( "/facilities" );
                    flash.add().okay = "Facility updated";
                    $scope.facility = null;
                    $scope.facilityForm.$setPristine();
                } )
                .error(
                function ( data, code )
                {
                    flash.now().err = "Failed to update Facility: " + data + " [code:  " + code + "]";
                } );
        }
        else
        {
            $http.post( "/rest/facilities", $scope.facility )
                .success(
                function ()
                {
                    $location.path( "/facilities" );
                    flash.add().okay = "Facility created";
                    $scope.facility = null;
                    $scope.facilityForm.$setPristine();
                } )
                .error(
                function ( data, code )
                {
                    flash.now().err = "Failed to create Facility: " + data + " [code:  " + code + "]";
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