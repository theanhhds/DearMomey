angular.module("solveTheDay").
	config(['$routeProvider',
		function config($routeProvider){
			$routeProvider.
				when('/', {template: '<app-home></app-home>'}).
				when('/register', {template: '<app-register></app-register>'}).
				when('/login', {template: '<app-login></app-login>'}).
				when('/dashboard', {template: '<app-dashboard></app-dashboard>'}).
				when('/analyze', {template: '<app-analyze></app-analyze>'}).
				otherwise({template: "<h1>Error 404: Nothing here</h1>"});
		}
	]);