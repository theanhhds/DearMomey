angular.module("dashboard").
	component("appDashboard", {
		templateUrl: "app/dashboard/dashboard.tmp.html",
		controller: ["$http", "myService", "$timeout", "$scope", 
					function DashBoardController($http, myService, $timeout, $scope){
			let self = this, username, expends, expendsPromise;
			
			this.$onInit = () => {
				myService.verifyToken();
				self.username = myService.username;
				// myService.getExpends(self.expends);
				myService.getExpends().then(data => {self.expends = data.expends});
				// self.expends = myService.expends;
			}
			
			$scope.$on("refreshExpends", (evt, data) => {
				myService.getExpends().then(data => {self.expends = data.expends});
			});
			
			$scope.$on("openAddNewModal", (e, d) => {
				self.openAddNew();
			});
			
			let modal_addnew = document.getElementById("modal-addnew");
			
			
			this.openAddNew = () => {
				modal_addnew.style.display = "block";
			}
			
			this.consoleExpends = () => {
				// self.expends = myService.expends;
				console.log(self.expends);
			}
			
			window.onclick = function(event) {
			    if (event.target == modal_addnew) {
					modal_addnew.style.display = "none";
			    }
			  
				
			}
		}
		]});