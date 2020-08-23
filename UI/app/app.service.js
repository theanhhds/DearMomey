angular.module("solveTheDay").factory("myService", ["$location", "$window", "$http", ($location, $window, $http) => {
	var service = {};
	
	//	local:	http://localhost:8000
	// 	pulic:  <Your public server link here>	//Remember to change when deploy
	service.url = "http://localhost:8000";
	service.add = (a,b) => {
		return a+b;
	}
	
	service.redirect = (url) => {
		$window.location.href = url;
	}
	
	service.headers = {"Content-Type" : "application/json"};
	
	service.verifyToken = () => {
		var s_user = "", s_token = "", l_user = "", l_token = "";
		var cur_url = $location.absUrl();
		// console.log(cur_url);
		s_user = sessionStorage.getItem("user");
		s_token = sessionStorage.getItem("token");
		l_user = localStorage.getItem("user");
		l_token = localStorage.getItem("token");
		if ((s_user && s_token)){
			service.username = s_user;
			$http({
				method: "post",
				url : service.url + "/verify",
				data : {usr: s_user, token: s_token},
				headers : service.headers,
			}).then(res => {return res.data}).then(data => {
				if (data.status == "ok"){
					if (cur_url.includes("login"))
						service.redirect("#!/dashboard");
				}
				else if (!cur_url.includes("login")){
					service.redirect("/#!/login?access=false");
				}
			});
		}
		else
		if ((l_user && l_token)){
			service.username = l_user;
			$http({
				method: "post",
				url : service.url + "/verify",
				data : {usr: l_user, token: l_token},
				headers : service.headers,
			}).then(res => {return res.data}).then(data => {
				if (data.status == "ok"){
					if (cur_url.includes("login"))
						service.redirect("#!/dashboard");
				}
				else if (!cur_url.includes("login")){
					service.redirect("/#!/login?access=false");
				}
			});
		}
		else
		{
			if (!cur_url.includes("login"))
				service.redirect("/#!/login?access=false");
		}
	}
	
	service.wakeUp = () => {
		$http.get(service.url + "/wake").then((res) => {return res.data}).then(data => {
			if (data == "ok"){
				document.getElementById("overlay").style.display = "none";
			}
		});
	}
	
	service.getExpends = (hehe) => {
		let data = {};
		data.username = service.username;
		return $http({
			method: "post",
			data: data,
			url : service.url + "/getExpends",
			headers : service.headers,
		}).then(res => {return res.data});
	}
	
	
	return service;
}]);