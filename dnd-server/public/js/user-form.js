async function UserForm(action) {
	logout();
    let login = await make(`<form action="${action}" method="POST">
	  <label for="username">username: </label><input id="username" name="username"/>
	  <br/>
	  <label for="password">password: </label><input type="password" id="password" name="password"/>
	  <br/>
	  <button type="submit" class="mdc-button">submit</button>
	</form>`);
    login.submit(async function(event) {
        event.preventDefault();
        const user = {
            username: $("#username").val(),
            password: $("#password").val()
        };

        const method = "post";
        const path = action;
        const req = await request(method, path, user);
        const resp = JSON.parse(req.responseText);
        if (resp.success) {
            console.log(resp.cookie);
            localStorage.setItem("cookie", resp.cookie);
			localStorage.setItem("uuid", (await request("get", "/whoami")).responseText);
			window.location.href = redirecturl;
        } else {
            alert("Something went wrong. Error: " + resp.error);
        }
        return false;
    });
	
	return login;
}
