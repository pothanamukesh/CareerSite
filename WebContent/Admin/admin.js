app.controller('adminctrl', [ '$scope', '$http',function($scope, $http) {
	var BASE_URL = 'http://localhost:8081/CareerSiteBackend';
	$scope.adminBlogs = function() {
		console.log("get admin blogs")
		$http({
			method : 'GET',
			url : BASE_URL+'/adminblog'
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
	$scope.acceptblog=function(id){
		$http({
			method:'POST',
		url:BASE_URL+'/acceptblog/'+id
		}).success(function(data,status,headers,config){
			$scope.adminBlogs();
		})
	};
	$scope.rejectblog=function(id){
		$http({
			method:'POST',
		url:BASE_URL+'/rejectblog/'+id
		}).success(function(data,status,headers,config){
			$scope.adminBlogs();
		})
	};
	$scope.adminForums = function() {
		console.log("get admin forums")
		$http({
			method : 'GET',
			url : BASE_URL+'/adminforum'
		}).success(function(data, status, headers, config) {
			$scope.forums=data;
			angular.forEach($scope.forums, function(value, key){
			      //if(value.Password == "thomasTheKing")
				var user=value.userid
			         console.log(user);
			   });
		}).error(function(data, status, headers, config) {
			alert("Error");
		});
	};
	$scope.acceptforum=function(id){
		$http({
			method:'POST',
		url:BASE_URL+'/acceptforum/'+id
		}).success(function(data,status,headers,config){
			$scope.adminForums();
		})
	};
	$scope.rejectforum=function(id){
		$http({
			method:'POST',
		url:BASE_URL+'/rejectforum/'+id
		}).success(function(data,status,headers,config){
			$scope.adminForums();
		})
	};
}])