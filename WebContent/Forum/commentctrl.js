app.controller('commentctrl', [ '$scope', '$http','$rootScope', 
	function($scope, $http,$rootScope) {
	var BASE_URL = 'http://localhost:8081/CareerSiteBackend';
	$scope.iforum=$rootScope.individualforums;
	//console.log(individualforums)
	$scope.submit=function(id){
		$scope.forumcomment={
				comment:$scope.comment
		}
		$http({
			method:'POST',
			url:BASE_URL+'/commentforum/'+id ,
			data:$scope.forumcomment
		}).success(function(data, status, headers, config) {
			$scope.comment='';
		})
	}
	$scope.getcomment=function(id){
		$http({
			method:'GET',
			url:BASE_URL+'/getforumcomment/'+id
		}).success(function(data,status,headers,config){
			$scope.comments=data;
		})
	}
	$scope.getuser=function(id){
		$http({
			method: 'GET',
			url: BASE_URL+'/oneuser/'+id
		}).success(function(data,status,headers,config){
			$scope.users=data;
		})
	}
}])