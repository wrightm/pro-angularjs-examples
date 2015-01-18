var controllersModule = angular.module("exampleApp.Controllers", []);

controllersModule.controller("dayController", function($scope, days){
	$scope.day = days.today;
	console.log('today: '+$scope.day);
});

controllersModule.controller("tommorrowController", function($scope, days){
	$scope.day = days.tomorrow;
	console.log('tomorrow: '+$scope.day);
});