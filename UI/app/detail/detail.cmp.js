angular.module("detail").
	component("appDetail", {
		bindings : {expend : '<'},
		templateUrl: "app/detail/detail.tmp.html",
		controller: ["$http", "myService", "$timeout", 
			function ListController($http, myService, $timeout){
			var category, self;
			self = this;
			
			this.$onInit = () =>{
				
			}
			
			this.closeDetailModal = () => {
				document.getElementById("modal_detail").style.display = "none";
			}
			
			// console.log(self.expend);
			
		}
		]});