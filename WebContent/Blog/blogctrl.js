var app=angular.module("blogapp",[])
app.controller('blogctrl', [ '$scope', '$http',function($scope, $http) {
	var BASE_URL = 'http://localhost:8081/CareerSiteBackend';

	$scope.getAllBlogs= function() {
		console.log("get all blogs")
		$http({
			method : 'GET',
			url : BASE_URL+'/blog'
		}).success(function(data, status, headers, config) {
			$scope.blogs=data;
			angular.forEach($scope.blogs, function(value, key){
			      //if(value.Password == "thomasTheKing")
				var user=value.userid
			         console.log(user);
			   });
		}).error(function(data, status, headers, config) {
			alert("Error");
		});
	};
	$scope.submit = function() {
		console.log("create blog")
		$scope.blog = {	
			id:$scope.id,
			title : $scope.title,
			userid:$scope.userid,
			doc:$scope.doc,
			content : $scope.content,
		}
		$http({
			method : 'POST',
			url : BASE_URL + '/createblog',
			data : $scope.blog
		})
		.success(function(data, status, headers, config) {
		});
	};
	$scope.deleteblog=function(id){
		$http({
			method:'DELETE',
		url:BASE_URL+'/deleteblog/'+id
		}).success(function(data,status,headers,config){
			$scope.getAllBlogs();
		})
	};
	$scope.editblog=function(id,title,content){
		$scope.id=id;
		$scope.title=title;
		$scope.content=content;
	};
	$scope.like=function(id){
		$http({
			method : 'POST',
			url : BASE_URL + '/likeblog/'+id,
		}).success(function(data, status, headers, config) {
			alert("success")
		})
		
	}
	        }]);


/*var app=angular.module("blogapp",[])
app.controller('blogctrl', [ '$scope', '$http','blogService','$rootScope',
	function($scope, $http,blogService,$rootScope) {
	var BASE_URL = 'http://localhost:8081/CareerSiteBackend';
	$rootScope.likeLength =0;
	$rootScope.blogLikes = 0;
	console.log("blogid is====="+	$rootScope.blogid)
	$scope.getAllBlogs= function() {
	
		console.log("get all blogs")
		$http({
			method : 'GET',
			url : BASE_URL+'/blog'
		}).success(function(data, status, headers, config) {

			blogService.fetchAllblogLikes()
			.then(
			function(response){
				//Success Data
				$rootScope.blogLikes = response;
				$rootScope.likeLength = $scope.blogLikes.length;
				console.log("Length: "+$rootScope.likeLength)
				console.log("Blogid: "+$rootScope.blogLikes)
				$scope.blogs=data;
			}		,function(errResponse)
			{
				//error Data
			}
			);

		}).error(function(data, status, headers, config) {
			alert("Error in Base_URL........................!");
		});
	};
	$scope.submit = function() {
		console.log("create blog")
		$scope.blog = {	
			id:$scope.id,
			title : $scope.title,
			userid:$scope.userid,
			doc:$scope.doc,
			content : $scope.content,
		},
		 
		
		
		this.fetchAllblogLikes = function() {
			console.log("fetchAllblogLikes...")
			blogService.fetchAllblogLikes()
					.then(
							function(d) {
								$scope.blog = d;
							},
							function(errResponse) {
								console.error('Error while fetching BLOgLikes');
							});
		};
		
		//self.fatchAllblogLikes();
		
		
		
		
		$http({
			method : 'POST',
			url : BASE_URL + '/createblog',
			data : $scope.blog
		}).success(function(data, status, headers, config) {
			$scope.id='';
			$scope.title='';
			$scope.userid='';
			$scope.doc='';
			$scope.content='';
			$location.url($location.path());
		});
	};
	$scope.deleteblog=function(id){
		$http({
			method:'DELETE',
		url:BASE_URL+'/deleteblog/'+id
		}).success(function(data,status,headers,config){
			$scope.getAllBlogs();
		})
	};
	$scope.editblog=function(id,title,content){
		$scope.id=id;
		$scope.title=title;
		$scope.content=content;
	};
	$scope.like=function(id){
		console.log("fetch bloglikes start.....!!")
		blogService.fetchAllblogLikes()
		.then(
				function(d){
					$scope.blog=d;
					angular.forEach($scope.blog, function(value, key){
					    var user=value.userid
					       console.log("userid=="+user);
					   });
					console	.log("Scope Data=== "	+$scope.blog)
					if($scope.blog.id==$scope.blogs.id)
						{}
					else
						{}
				});

		$http({
			method : 'POST',
			url : BASE_URL + '/likeblog/'+id,
		}).success(function(data, status, headers, config) {
			alert("success")
		})
		
	},
	
	$scope.getBlogUserLike = function(userid, blogid)
	{
		$scope.i = 0;
//		$scope.j = $scope.blogLikes.length;
		console.log("Like Data: "+$rootScope.blogLikes)
		console.log("helllo: "+$rootScope.likeLength)
       console.log("Blogid: "+$rootScope.blogLikes.blogid)

		
		angular.forEach($rootScope.blogLikes, function(value, key){
//			    var user=value.userid
			console.log("Check==="+((value.userid == userid)&&(value.blogid == blogid)))
			$rootScope.blogid=value.blogid;
console.log("blogid is====="+	$rootScope.blogid);
			if((value.userid == userid)&&(value.blogid == blogid)){
			       console.log("Blog user Id"+value.userid+" Blog id: "+value.blogid);
			       return true;
			       consle.log("return is working......!")
			       }
			   });
		
	}
	
	return false;
	        }]);
*/