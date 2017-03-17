var app = angular.module("myApp", ["ngRoute","ngCookies","blogapp"])
.run(run);
app.config(function($routeProvider,$locationProvider) {
	
    $routeProvider
    .when("/", {
        templateUrl : "Blog/viewblog.html",
    
    })
     
    .when("/home", {
        templateUrl : "home/Home.html",
        controller:'UserController'
  
    })
    .when("/blog", {
        templateUrl : "Blog/blog.html",
        controller :'blogctrl'
       
    })
    .when("/viewblog", {
        templateUrl : "Blog/viewblog.html",
        controller :'blogctrl'
       
    })
    .when("/forum", {
        templateUrl : "Forum/Forum.html",
        controller :  'forumctrl'
   
    })
     .when("/viewforum", {
        templateUrl : "Forum/viewforum.html",
        controller :'forumctrl'
       
    })
    .when("/register",{
    	templateUrl: "Users/register.html",
    	controller: "userctrl"
    })
    .when("/login",{
    	templateUrl:"Login/Login.html",
    	controller:'UserController',
   
    })
         .when("/users",{
    	templateUrl: "Friend/AllUsers.html",
    	controller:'alluserctrl'
    })
    .when("/chat",{
    	templateUrl: "Chat/chat.html",
    	controller: "chatController",
    })
    .when("/jobs",{
    	templateUrl: "Job/CreateJob.html",
    	controller: "jobctrl"
    })
    .when("/applyjob",{
    	templateUrl: "Job/ViewJob.html",
    	controller: "jobctrl"
    })
    .when("/individualforum",{
    	templateUrl: "Forum/IndividualForum.html",
	controller: "commentctrl"
    })
    .when("/myprofile",{
    	templateUrl: "Users/UserProfile.html",
    	controller: "userctrl"
    })
    .when("/myfriends",{
    	templateUrl: "Friend/MyFriends.html",
    	controller: "myfriendctrl"
    })
    .when("/newrequests",{
    	templateUrl: "Friend/newrequests.html",
    	controller: "myfriendctrl"
    })
    .when("/admin",{
    	templateUrl: "Admin/admin.html",
    	controller: "adminctrl"
    });
       console.log("route")
});
run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
function run($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    $rootScope.currentUser = $cookieStore.get('currentUser') || {};
    if ($rootScope.currentUser) {
    	console.log("cuurent user="+$rootScope.currentUser)
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.currentUser // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register','/home','/viewforum','/viewblog']) === -1;
        var adminPage = $.inArray($location.path(),['/admin']) === 1;
        var role=$rootScope.currentUser.role;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/home');
        }else if(adminPage && !loggedIn){
        	$location.path('/home');
        }
    });
}
