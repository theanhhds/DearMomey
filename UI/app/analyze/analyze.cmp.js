angular.module("analyze")
	
	.config(['ChartJsProvider', function (ChartJsProvider) {
		// Configure all charts
		ChartJsProvider.setOptions({
		  chartColors: ['#FF5252', '#FF8A80'],
		  responsive: false
		});
		// Configure all line charts
		ChartJsProvider.setOptions('line', {
		  showLines: false
		});
	  }])
	.component("appAnalyze",{
	templateUrl : "./app/analyze/analyze.tmp.html",
	controller: ["$http", "myService", "$rootScope", "$timeout", "$scope",
		function AnalyzeController($http, myService, $rootScope, $timeout, $scope){
			let self = this, username, expends, expendsPromise, listExps, totalSpend = "";
			let s_date, e_date, min_date;
			let data = ["100", "500", "240"]; 
			let labels = [""];
			this.$onInit = () => {
				myService.verifyToken();
				self.username = myService.username;
				// myService.getExpends(self.expends);
				myService.getExpends().then(data => {self.expends = data.expends});
				// self.expends = myService.expends;
			}
			
			this.handleChangeSDate = () => {
				let month_num = {Jan: "01", Feb: "02", Mar: "03", Apr: "04", May : "05", Jun : "06", Jul : "07",
								Aug : "08", Sep : "09", Oct : "10", Nov : "11", Dec : "12"};
				let fdate = self.s_date.toString().substr(4,11);
				let month = month_num[fdate.substr(0,3)];
				let date = fdate.substr(4,2);
				let year = fdate.substr(7,4);
				
				self.min_date = year+"-"+month+"-"+date;
				// console.log(self.min_date);
			}
			
			
			
			this.selectDate = () => {
				self.totalSpend = "";
				$rootScope.$broadcast("refreshFilter", true);
				
				let month_num = {Jan: "01", Feb: "02", Mar: "03", Apr: "04", May : "05", Jun : "06", Jul : "07",
								Aug : "08", Sep : "09", Oct : "10", Nov : "11", Dec : "12"};
								
				let fdate = self.s_date.toString().substr(4,11);
				let smonth = month_num[fdate.substr(0,3)];
				let sdate = fdate.substr(4,2);
				let syear = fdate.substr(7,4);
				
				fdate = self.e_date.toString().substr(4,11);
				let emonth = month_num[fdate.substr(0,3)];
				let edate = fdate.substr(4,2);
				let eyear = fdate.substr(7,4);
				
				let start = syear+smonth+sdate;
				let end = eyear+emonth+edate;
				
				let exps = new Array();
				self.expends.map((i) => {
					if (i.date.std >= start && i.date.std <= end)
						exps.push(i);
				});
				
				self.listExps = exps;
				
				let w = [0,0,0,0,0];
				exps.map((i) => {
					// console.log(i);
					let index = parseInt(i.category)-1;
					// let
					w[index] = parseFloat(w[index]) + parseFloat(i.amount);
					// console.log(w[index], i.amount);
					w[index] = (Math.round(w[index] * 100) / 100).toFixed(2);
				});
				self.totalSpend = parseFloat(w[0]) + parseFloat(w[1]) + parseFloat(w[2]) + parseFloat(w[3]) + parseFloat(w[4]);
				self.totalSpend = self.totalSpend.toFixed(2);	
				$scope.labels = ["Housing", "Eating", "Entertainment", "Traveling", "Others"];
				$scope.data = w;
			}
		}
	]
});