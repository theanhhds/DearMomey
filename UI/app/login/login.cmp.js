angular.module("login").
	component("appLogin", {
		templateUrl: "./app/login/login.tmp.html",
		controller: ["$http", "myService", "$timeout", 
					function LoginController($http, myService, $timeout){
			let usr, psw;
			let self = this;
			let rmb = false;
			myService.verifyToken();
			
			this.login = () => {
				let data = {};
				let url = myService.url + "/login";
				let headers = myService.headers;
				data.usr = self.usr;
				data.psw = self.psw;
				$http({
					method : "post",
					url : url,
					data: data,
					headers: headers
				}).then(res => {return res.data}).then(data => {
					// console.log(data);
					if (data.status == "ok"){
						sessionStorage.removeItem("user"); sessionStorage.removeItem("token");
						localStorage.removeItem("user"); localStorage.removeItem("token"); 
						if (!self.rmb){
							sessionStorage.setItem("user", self.usr);
							sessionStorage.setItem("token", data.token);
							myService.redirect("/#!/dashboard");
						}
						else{
							localStorage.setItem("user", self.usr);
							localStorage.setItem("token", data.token);
							myService.redirect("/#!/dashboard");
						}
					}
				});
				// console.log("login");
			}
		}]
	});