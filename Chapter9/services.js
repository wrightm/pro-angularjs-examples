angular.module('exampleApp.Services',[])
.service('days',function(nowValue){
	this.today = nowValue.getDay();
	this.tomorrow = this.today + 1;
});

angular.module('exampleApp.Services')
.config(function(){
	console.log('Services module config: (unknown)');
})
.run(function(startTime){
	console.log('Services module run: ' + startTime);
});
