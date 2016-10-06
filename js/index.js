var app = angular.module('App', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        }).when('/dashboard', {
            templateUrl: 'templates/dashboard.html',
            controller: 'DashboardController'
        }).when('/signup', {
            templateUrl: 'templates/signup.html',
            controller: 'SignupController'
        }).when('/posts', {
            templateUrl: 'templates/posts.html',
            controller: 'PostController'
        });
});

app.run(function($rootScope, $window, $location) { //                                           line 20-33  manages session
    $rootScope.$on('$routeChangeStart', function(event, a){ //    this block gets run everytime before we go to any other page  'a'-tells on which pg we were at earlier and now which pg we r going to
        console.log(a.$$route.originalPath);//  for debugging       whole- it is just like $_SEESION and session_start()
        if(!$window.sessionStorage.user && a.$$route.originalPath!="/signup"){//whenever we r checking if the pg is anyother than signup then send it to login page
            $location.path('/');
        }else if(a.$$route.originalPath=="/signup"){

        }//   line - 21 $on - whenever route changes the whole fn will be called ; $routeChangeStart will automatically be called whenever page changes
    });// 
//$window-all the instance of a browser comes in window(like history,cookies,cache); $location-for changing one pg to another
//window.sessionStorage.user - checks whether an user is there or not
    $rootScope.$on('$viewContentLoaded',function(){ // whwenever content will be loaded it will initialise the dropdown fn
        $('.dropdown-toggle').dropdown();
    });
});


                                            //http- for sending req to server //rootScope- for whole window's scope
app.controller('LoginController', ['$scope','$http', '$location', '$rootScope', '$window', function($scope, $http, $location, $rootScope, $window) {
    //$scope.user = { name: 'John Doe', age: 22 };

    

    $scope.init=function(){// when the page will be render the fn will be called
        if($window.sessionStorage.user){//if usr is already login send to dashboard
            $location.path('/dashboard');
        }
        $scope.user={};//this will take the value 
    };

    $scope.login=function(user){

        //console.log(user);
        $http({
            method:"POST",
            url:"http://localhost/ng/verify_user.php",
            data:{
                'email':user.email,
                'password':user.password
            }
        }).then(function(response){
            if(response.data!="false"){
                $window.sessionStorage.setItem('user', JSON.stringify((response.data)));// we r inputting the name into the sesion
                $location.path('/dashboard');
            }else{
                sweetAlert('Login Failed');
            }
        }, function(error){});
    };

}]).controller('DashboardController', ['$scope', '$rootScope','$http','$location', '$window', function($scope, $rootScope,$http, $location, $window) {
    
    $scope.init=function(){
        $scope.user=JSON.parse($window.sessionStorage.getItem('user'));
    };

    $scope.logout=function(){
        delete $window.sessionStorage.user;
        $location.path('/');
    };

    $scope.add=function(post){
        $http({
            method:"POST",
            url:"http://localhost/ng/add_post.php",
            data:{
                'title':post.title,
                'body':post.body,
                'user':$scope.user.id
            }
        }).then(function(response){
            if(response.data!="false"){
                sweetAlert('Post created successfully.');
                $location.path('/posts');
            }else{
                sweetAlert('Post not created!');
            }
        }, function(error){});
    };

}]).controller('PostController', ['$scope', '$rootScope','$http','$location', '$window', function($scope, $rootScope,$http, $location, $window) {
    
    $scope.init=function(){
        $scope.user=JSON.parse($window.sessionStorage.getItem('user'));

        $http({
            method:"GET",
            url:"http://localhost/ng/view_post.php?id="+$scope.user.id
        }).then(function(response){
            if(response.data!="false"){
                $scope.posts=angular.copy(response.data);
            }else{
                sweetAlert('Something wrong happened!');
            }
        }, function(error){});
    };

    $scope.logout=function(){
        delete $window.sessionStorage.user;
        $location.path('/');
    };

}]).controller('SignupController', ['$scope', '$rootScope', '$http', '$location', '$window', function($scope, $rootScope, $http, $location, $window) {
    
    $scope.init=function(){
        if($window.sessionStorage.user){
            $location.path('/dashboard');
        }
        $scope.user={};
    };

    $scope.signup=function(user){

        //console.log(user);
        $http({
            method:"POST",
            url:"http://localhost/ng/add_user.php",
            data:{
                'name':user.name,
                'email':user.email,
                'password':user.password
            }
        }).then(function(response){
            if(response.data!="false"){
                $window.sessionStorage.setItem('user', JSON.stringify((response.data)));
                $location.path('/dashboard');
            }else{
                sweetAlert('User not created!');
            }
        }, function(error){});
    };
}]);
