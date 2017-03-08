app.controller('myfriendctrl',['$scope','$http',function($scope,$http){
	var BASE_URL = 'http://localhost:8081/CareerSiteBackend';
	
	$scope.getmyfriends=function(){
		$http({
			method : 'GET',
			url : BASE_URL+'/myfriends'
		}).success(function(data, status, headers, config) {
			$scope.myfriends=data;
			//alert(data); 
		}).error(function(data, status, headers, config) {
			alert("Error");
		});
	}
	$scope.getsnewrequests=function(){
		$http({
			method : 'GET',
			url : BASE_URL+'/newrequests'
		}).success(function(data, status, headers, config) {
			$scope.newrequest=data;
			//alert(data); 
		}).error(function(data, status, headers, config) {
			alert("Error");
		});
	}
	$scope.accept=function(fid){
		$http({
			method : 'POST',
			url : BASE_URL+'/acceptrequest/'+fid
		});
	}
	$scope.reject=function(fid){
		$http({
			method : 'POST',
			url : BASE_URL+'/rejectrequest/'+fid
		});
	}
}])