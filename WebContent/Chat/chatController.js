
console.log("app")
app.controller("chatController",function($scope,ChatService){
	console.log("chatctrl")
	$scope.messages=[];
	$scope.message="";
	$scope.max=140;
	$scope.friends=[];
	
	$scope.addMessage=function(){
		console.log("chat")
		ChatService.send($scope.message, $scope.friends);
		$scope.message="";
	};
	ChatService.receive().then(null,null,function(message){
		$scope.messages.push(message);
		})
})