function LoginCtrl( $rootScope, $scope, $http, $location )
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
                $rootScope.error = "Login failed";
            }
        );
    };
}

function NavCtrl( $rootScope, $scope )
{
    $scope.user = $rootScope.user
}

function UsersCtrl( $scope, $http )
{
    $http.get("/rest/users")
        .success(
            function( users )
            {
                $scope.users = users;
            }
        );
}

function UserCtrl( $scope, $http, $location, $routeParams )
{
    $scope.buttonText = "Create";
    if( null != $routeParams.id )
    {
        $http.get("/rest/users/" + $routeParams.id )
            .success(
                function( user ){
                    $scope.user = user;
                }
            );
        $scope.buttonText = "Update";
    }

    $scope.submit = function()
    {
        if( null != $scope.user._id )
        {

        }
        else
        {
            $http.post("/rest/users", $scope.user)
                        .success(
                            function(){
                                $location.path("/users");
                            }
                    );
        }

        $scope.user = null;
        $scope.userForm.$setPristine();
    }
}

function ParentsCtrl( $scope, $http )
{
    $http.get("/rest/parents_user")
        .success(
            function( parents )
            {
                $scope.parents = parents;
            }
        );
}

function ChildrenCtrl( $scope, $http )
{
    $http.get("/rest/children")
        .success(
            function( children )
            {
                $scope.children = children;
            }
        );
}