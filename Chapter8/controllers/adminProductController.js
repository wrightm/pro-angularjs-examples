angular.module("sportsStoreAdmin")
.constant("productUrl", "https://api.parse.com/1/classes/Products/")
.run(function($http){
	$http.defaults.headers.common["X-Parse-Application-Id"]
        = "dEMqkbweuMA5kDYTFZjOLsV6XS5oVtjcgi30kzKL";
    $http.defaults.headers.common["X-Parse-REST-API-Key"]
        = "C8PLXvn56wfX2Fm3uaKDBWoePg5yyGUIhFW6d8Jl";
})
.controller("productController", function($scope,$http,$resource,productUrl){

	$scope.$on("sessionToken", function(sessionToken){
		$http.defaults.headers.common["X-Parse-Session-Token"] = sessionToken;
	});

	function getData(data, headers){
		return JSON.parse(data).results;
	};

	$scope.productsResource = $resource(productUrl + ":id", {id:"@objectId"},{
		query: {
			method: "GET", isArray: true, transformResponse: getData
		},
		update: {
			method: "PUT"
		}
	});

	$scope.listProducts = function(){
		$scope.products = $scope.productsResource.query();
		$scope.products.$promise.then(function(data){
			for(var i in data){
				console.log(data[i].objectId);
			}
		});
	};

	$scope.deleteProduct = function(product){
		product.$delete().then(function(){
			$scope.products.splice($scope.products.indexOf(product), 1);
		});
	};

	$scope.createProduct = function(product){
		new $scope.productsResource(product).$save().then(function(response){
			response.$get().then(function(newProduct){
				$scope.products.push(newProduct);
				$scope.editedProduct = null;
			});
		});
	};

	$scope.updateProduct = function(product) {
		var pCopy = {};
		angular.copy(product, pCopy);
		pCopy.$update().then(function(){
			$scope.editedProduct = null;
		});
	};

	$scope.startEdit = function (product) {
		$scope.editedProduct = product;
	};

	$scope.cancelEdit = function(){
		$scope.editedProduct = null;
	};

	$scope.listProducts();
});
