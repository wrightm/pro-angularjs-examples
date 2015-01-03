angular.module("sportsStore")
.constant("dataUrl", "https://api.parse.com/1/classes/Products")
.constant("orderUrl", "https://api.parse.com/1/classes/Orders")
.run(function($http){
	$http.defaults.headers.common["X-Parse-Application-Id"] = "dEMqkbweuMA5kDYTFZjOLsV6XS5oVtjcgi30kzKL";
	$http.defaults.headers.common["X-Parse-REST-API-Key"] = "C8PLXvn56wfX2Fm3uaKDBWoePg5yyGUIhFW6d8Jl";
})
.controller("sportsStoreController", function($scope,$http,$location,dataUrl,orderUrl,cart){

	$scope.data = {};

	$http.get(dataUrl).success(function(data){
		$scope.data.products = data.results;
	}).error(function(response){
		$scope.data.error = response.error || response;
	});

	$scope.sendOrder = function(shippingDetails){
		var order = angular.copy(shippingDetails);
		$http.post(orderUrl, order).success(function(data){
			$scope.data.orderId = data.orderId;
			cart.getProducts().length = 0;
		}).error(function(error){
			$scope.data.orderError = error;
		}).finally(function(){
			$location.path("/complete");
		});
	};
});