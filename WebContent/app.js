var app = angular.module("myApp", ["ngRoute","ngCookies"])
.run(run);
app.config(function($routeProvider,$locationProvider) {
	
    $routeProvider
    .when("/", {
        templateUrl : "index.html",
    
    })
     
    .when("/home", {
        templateUrl : "home/Home.html",
        controller:'LoginController',
    	controllerAs:'vm'
    })
			// route for the home page
			.when('/', {
				templateUrl : 'home/Home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'about/about.html',
				controller  : 'aboutController'
			})	
			.when('/register', {
				templateUrl : 'Users/register.html',
				controller  : 'userctrl'
			})
			.when('/login', {
				templateUrl : 'Login/Login.html',
				controller  : 'LoginController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'contact/contact.html',
				controller  : 'contactController'
			});
	});
	
	
	run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
	function run($rootScope, $location, $cookieStore, $http) {
	    // keep user logged in after page refresh
	    $rootScope.globals = $cookieStore.get('globals') || {};
	    $rootScope.currentuser = $cookieStore.get('currentuser') || {};
	    if ($rootScope.globals.currentUser) {
	        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
	    }

	    $rootScope.$on('$locationChangeStart', function (event, next, current) {
	        // redirect to login page if not logged in and trying to access a restricted page
	        var restrictedPage = $.inArray($location.path(), ['/login', '/register','/','/about','/contact','/viewblog','/viewforum']) === -1;
	        var adminPage = $.inArray($location.path(),['/admin']) === 1;
	        var role=$rootScope.currentuser.role;
	        var loggedIn = $rootScope.globals.currentUser;
	        if (restrictedPage && !loggedIn) {
	            $location.path('/login');
	        }else if(adminPage && !loggedIn){
	        	$location.path('/login');
	        }
	    });
	}