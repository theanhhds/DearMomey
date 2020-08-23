angular.module("list").
	component("appList", {
		bindings: {expendsList	: '<'},
		templateUrl: "app/list/list.tmp.html",
		controller: ["$http", "myService", "$timeout", "$rootScope",
					function ListController($http, myService, $timeout, $rootScope){
			let self = this, expends, expend_detail, limitTo, isMore;
			
			this.$onInit = () => {
				self.limitTo = 4;
				self.isMore = false;
			}
			
			$rootScope.$on("refreshFilter", (evt, data) => {
				// console.log("hehe");
				self.limitTo = 4;
				self.isMore = false;
			});
			
			this.loadMore = () => {
				if (self.expendsList.length - self.limitTo <= 4){
					self.limitTo += 4;
					self.isMore = true;
				}
				self.limitTo += 4;
			}
						
			this.openDetailModal = (exp) =>{
				modal_detail.style.display = "block";
				let cat = exp.category;
				if (cat == 1) exp.category = "Housing";
				else if (cat == 2) exp.category = "Eating";
				else if (cat == 3) exp.category = "Entertainment";
				else if (cat == 4) exp.category = "Traveling";
				else if (cat == 5) exp.category = "Others";
				
				self.expend_detail = exp;
				
				// console.log(exp)
			}
			
			let modal_detail = document.getElementById("modal_detail");
			window.onclick = function(event) {
				// console.log(event.target);
				if (event.target == modal_detail)
					document.getElementById("modal_detail").style.display = "none";
				if (event.target == document.getElementById("modal-addnew"))
					document.getElementById("modal-addnew").style.display = "none";
			}
			
		}
		]});