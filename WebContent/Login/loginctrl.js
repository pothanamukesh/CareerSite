app.controller('UserController', [ '$http', '$scope', 'UserService',
		'$location', '$rootScope', '$cookieStore',
		function($http, $scope, UserService, $location, $rootScope, $cookieStore) {
			console.log('LoginControler');
			var BASE_URL = 'http://localhost:8081/CareerSiteBackend';

			var self = this;
			self.user = {
					id : '',
	     		  username: '',
					  password: '',
					  errorCode:'',
					  role:'',
					errorMessage:'',
					password : '',
					
					  
			};
			
			
			this.user = []; //json array
			
			 $scope.orderByMe = function(x) {
			        $scope.myOrderBy = x;
			    }
	

			 this.fetchAllUsers = function() {
				console.log("fetchAllUsers...")
				UserService
						.fetchAllUsers()
						.then(
								function(d) {
									self.user = d;
								},
								function(errResponse) {
									console.error('Error while fetching Users');
								});
			};
			
			//self.fatchAllUsers();

			self.login = function(user) {
				console.log("authenticated...")
				UserService.login(self.user)
						.then(

								function(d) {

									self.user = d;
									console	.log("user.errorCode: "	+ self.user.errorCode)
									
									if (self.user.errorCode == "404")

									{
										alert('Invalid Credentials Please Login Valid credentials..........!')
										self.user.username = "";
										self.user.password = "";
										$location.path('/login');

									} else { //valid credentials
										console.log("Valid credentials. Navigating to home page")
										self.fetchAllUsers(); 
										UserService.SetCredentials(self.user); 
										console.log("username"+$rootScope.globals.currentUser.username)
										console.log("role"+$rootScope.globals.currentUser.role)
										 var  role = self.user.role;
										console.log("role=="+role)
										 if (role == "Admin")
										 { $location.path('/admin');
										 $rootScope.islogged = true;
										 }
										  else { 
											  $location.path('/home');
											  $rootScope.islogged = true;
											  } 
										
														
										console.log("User Successful=="+role);
										console.log('Current user : '+self.user.username)
										$rootScope.currentUser = self.user
										$cookieStore.put('currentUser', self.user);
										
										$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.currentUser; 
										//$location.path('/home');
										$rootScope.islogged = true;

									}

								},
								function(errResponse) {

									console.error('Error while authenticate Users');
								});
			};
			
				self.logout = function() {
					console.log("logout")
					$rootScope.globals.currentUser = {};
					$cookieStore.remove('currentUser');
					$cookieStore.remove('globals');
                    $cookieStore.remove('uid')
					UserService.logout();
                    $http.defaults.headers.common.Authorization = 'Basic';
					$location.path('/');
					$rootScope.islogged=false;

				}

		} ]);
