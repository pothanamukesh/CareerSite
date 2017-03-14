
//var app=angular.module("jobApp",[])
app.controller('jobctrl', ['$scope','$http',function($scope,$http) {
	var BASE_URL = 'http://localhost:8081/CareerSiteBackend';
	$scope.submit=function(){
		console.log("job")
		$scope.job = {	
				title : $scope.title,
				company:$scope.company,
				jobdetails:$scope.jobdetails,
				lastdate: $scope.lastdate
			}
		$http({
			method : 'POST',
			url : BASE_URL+'/createjob',
			data : $scope.job
		}).success(function(data, status, headers, config) {
			$scope.users=data;
			
			//alert(data); 
		}).error(function(data, status, headers, config) {
			alert("Error");
		});
	};

	$scope.getjobs=function(){
		$http({
			method : 'GET',
			url : BASE_URL+'/getjobs'
		}).success(function(data, status, headers, config) {
			$scope.jobs=data;
			//alert(data); 
		}).error(function(data, status, headers, config) {
			alert("Error");
		})
	};
}])