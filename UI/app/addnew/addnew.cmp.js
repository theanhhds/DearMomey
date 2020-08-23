angular.module("addnew").
	component("appAddnew", {
		bindings: {inData : '<'},
		templateUrl: "./app/addnew/addnew.tmp.html",
		controller: ["$http", "myService", "$timeout", "$scope",
			function AddNewController($http, myService, $timeout, $scope){
			
			let self = this;
			let category, name, amount, date, note;
			this.$onInit = () =>{
				self.category = '5';
			}
			
			this.closeModal = () => {
				document.getElementById("modal-addnew").style.display = "none";
			}
			
			function parseDate(s) {
				var b = s.split(/\D/);
				return new Date(b[0], --b[1], b[2]);
			}
			
			this.submitNew = () => {
				let data = {};
				data.username = self.inData;
				data.name = self.name;
				data.note = self.note;
				data.amount = self.amount;
				data.date = self.date.toString().substr(4, 11);
				data.category = self.category;
				// console.log(data);	
				
				if (data.name != null && data.amount != null
					&& data.date != null && data.category != 0){		//If there is enough data
					$http({
						method: "post",
						url : myService.url + "/addnew", 
						data : data,
						headers : myService.headers,
					}).then(res => {return res.data}).then(data => {
						if (data.status == "ok"){
							let doc = document.getElementById("message");
							doc.class = "w3-text-green w3-animation-zoom";
							doc.innerHTML = "Mommy got it, thanks!";
							self.name = ""; self.note = ""; self.amount = ""; self.date = ""; self.category = '5';
							$timeout(() => {
								doc.innerHTML = "Mommy is waiting ...";
							}, 3000);
							$scope.$emit("refreshExpends", true);
						}
					});
				} else {	//If not enough data
					alert("Please fill in everything!");
				}
			}
		}]
	});