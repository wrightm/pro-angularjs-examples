angular.module('exampleApp.Filters',[])
.filter("DayOfTheWeek", function(){
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	return function (input){

		if(!angular.isNumber(input)){
			return input;
		}

		if(input > (days.length-1)){
			return input;
		}

		return days[input];
	};
});