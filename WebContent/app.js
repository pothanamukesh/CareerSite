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
        var restrictedPage = $.inArray($location.path(), ['/login', '/register','/home','/viewblog','/viewforum']) === -1;
        var adminPage = $.inArray($location.path(),['/admin']) === 1;
        var role=$rootScope.currentUser.role;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }else if(adminPage && !loggedIn){
        	$location.path('/login');
        }
    });
}





/*run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
function run($rootScope, $location, $cookies, $http) {
      // keep user logged in after page refresh
	 $rootScope.globals = $cookies.get('globals') || {};
	  console.log("curent globals="+  $rootScope.globals.username);
   
    console.log("curent user1="+  $rootScope.globals.currentUser);

    $rootScope.currentUser = $cookies.get('currentUser') || {};
    console.log("curent user3="+  $rootScope.currentUser.username);

    $rootScope.$on('$locationChangeStart', function (event, next, current) {

    	
    	
    	
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register','/home','/viewblog','/viewforum']) === -1;
        var adminPage = $.inArray($location.path(),['/admin']) === 1;
        var loggedIn = $rootScope.globals.currentUser;
        var role=$rootScope.currentUser.role;
        console.log("curent role="+ role);
        
        console.log("Logged user: "+loggedIn);
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
              }
        else if(adminPage && !loggedIn){
        	$location.path('/login');
        }
        
        console.log("curent user main="+  $rootScope.currentUser);
    }
    
    
    
    );
    console.log("curent user main="+  $rootScope.globals.currentUser);
    if ($rootScope.globals.currentUser) {
        console.log("curent user main="+  $rootScope.globals.currentUser);

        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScopes.currentUser; // jshint ignore:line
    }


}*/
/*app.run( function ($rootScope, $location,$cookies, $http) {

	 $rootScope.$on('$locationChangeStart', function (event, next, current) {
		 console.log("$locationChangeStart")
	
	        // redirect to login page if not logged in and trying to access a restricted page
	     
		 var userPages = [ '/viewblog','/viewforum']
		 var adminPages = ['/admin']
		 
		 var currentPage = $location.path()
		 
		 var isUserPage = $.inArray(currentPage, userPages);
		 var isAdminPage = $.inArray(currentPage, adminPages) ;
		 
		 var isLoggedIn = $rootScope.currentUser.id;
	        
	     console.log("isLoggedIn:" +isLoggedIn)
	     console.log("isUserPage:" +isUserPage)
	     console.log("isAdminPage:" +isAdminPage)
	        
	        if(!isLoggedIn)
	        	{
	        	
	        	 if (isUserPage===-1 || isAdminPage===-1) {
		        	  console.log("Navigating to login page:")
		        	  alert("You need to loggin to do this operation")

						            $location.path('/login');
		                }
	        	}
	        
			 else //logged in
	        	{
	        	
				 var role = $rootScope.currentUser.role;
				 
				 if(isAdminPage && role!='Admin' )
					 {
					 
					  alert("You can not do this operation as you are logged as : " + role )
					   $location.path('/');
					 
					 }
				     
	        	
	        	}
	        
	 });
	 // keep user logged in after page refresh
     $rootScope.currentUser = $cookies.get('currentUser') || {};
     if ($rootScope.currentUser) {
         $http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.currentUser; 
     }
	 

});*/