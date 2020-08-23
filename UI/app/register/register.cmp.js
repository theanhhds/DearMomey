angular.module("register").
	component("appRegister", {
		templateUrl: "./app/register/register.tmp.html",
		controller: ["$http", "myService", "$timeout", function RegisterController($http, myService, $timeout){
			let usr, psw, psw_c, fname;
			let self = this;
			
			let isMatch = true;
			let isFull = false;
			let show = false;
			
			this.check = function(){
				if (self.psw && self.psw_c)
					if (self.psw == self.psw_c){
						return false;
					}
					else{
						return true;
					}
				return false;
			}
			
			this.checkfull = () => {
				if (self.usr && self.psw && self.psw_c && self.fname){	//If everything is fiiled
					return false;
				}
				else
					return true;
			}
			
			// console.log(isMatch, isFull);
			// console.log(myService.url, myService.add(6,9));
			// console.log(myService.redirect());
			this.register = () => {
				self.show = true;	//Show message if user click something
				self.isMatch = self.check();
				self.isFull = self.checkfull();	
				// console.log(self.isMatch, self.isFull, self.show);
				if (!self.isMatch && !self.isFull)		//If things are ready
				{
					self.show = false;	//Don't show messages anymore
					let url = myService.url + "/register";
					let data = {};
					let headers = myService.headers;
					data.usr = self.usr;
					data.psw = self.psw;
					data.fname = self.fname;
					$http({
						method: "post",
						url: url,
						data: data,
						headers: headers,
					}).then(res => {return res.data}).then(data => {
						if (data.status == "ok"){
							document.getElementById("ok_modal").style.display = "block";
							$timeout(()=>{
								myService.redirect("#!/login");
							}, 5000);
						}
					});
					// console.log(url);
				}
			}
		}]
	});