angular.module("navbar").component("appNavbar",{
	templateUrl : "./app/navbar/navbar.tmp.html",
	controller: ["$location", "$scope",
		function NavbarController($location, $scope){
			this.logOut = () => {
				sessionStorage.removeItem("user"); sessionStorage.removeItem("token");
				localStorage.removeItem("user"); localStorage.removeItem("token");
				$location.path("#!/");
			}
			
			this.openModal = () => {
				$scope.$emit("openAddNewModal");
			}
		}
	]
});