const port = "3001";
const redirecturl = "/home.html";
window.addEventListener("load", ()=>{
	const login = document.getElementById("login");
	if(login){
		login.addEventListener("submit", async function(event){
			event.preventDefault();
			const user = {
				username: document.getElementById("username").value,
				password: document.getElementById("password").value
			};
			
			const method = login.getAttribute("method");
			const path = login.getAttribute("action");
			const req = await request(method, path, user);
			const resp = JSON.parse(req.responseText);
			if(resp.success){
				console.log(resp.cookie);
				localStorage.setItem("cookie", resp.cookie);
			}else{
				alert("Something went wrong. Error: " + resp.error);
			}
			window.location.href = redirecturl;
			return false;
		}, false);
	}
});

function logout(){
	localStorage.clear();
}

function request(method, path, data){
	path = window.location.protocol + "//" + window.location.hostname + ":" + port + path;
	const promise = new Promise((resolve, reject)=>{
		const cookie = localStorage.getItem("cookie");
		function reqListener () {
			resolve(this);
		}
		const request = new XMLHttpRequest();
		request.addEventListener("load", reqListener);
		request.open(method, path);
		request.setRequestHeader("x-method", method);
		request.setRequestHeader("x-path", path);
		if(cookie && cookie.length)
			request.setRequestHeader("x-authcookie", cookie);
		console.log("sending", data);
		if(data){
			request.setRequestHeader('Content-Type', 'application/json');
			request.send(JSON.stringify(data));
		}else{
			request.send();
		}
	});
	return promise;
}


