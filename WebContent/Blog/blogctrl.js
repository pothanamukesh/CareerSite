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
		}).success(function(data, status, headers, config) {
			/*$scope.id='';
			$scope.title='';
			$scope.userid='';
			$scope.doc='';
			$scope.content='';
			$location.url($location.path());*/
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
