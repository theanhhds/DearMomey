angular.module("home").component("appHome",{
	templateUrl : "./app/home/home.tmp.html",
	controller: ["$http", "myService", "$timeout",
		function HomeController($http, myService, $timeout){
			this.$onInit = () => {
				$timeout(() => {myService.wakeUp()}, 500);
			}
		}
	]
});