angular.module("exampleApp.Directives",[])
.directive("highlight",function($filter){
	var dayFilter = $filter("DayOfTheWeek");

	return function(scope, element, attrs){
		if(dayFilter(scope.day) == attrs["highlight"]){
			element.css("color", "red");
		}
	};
});