const redirecturl = "/home";

function logout() {
    localStorage.clear();
}

function request(method, path, data) {
    //path = window.location.protocol + "//" + window.location.hostname + ":" + port + path;
    const promise = new Promise((resolve, reject) => {
        const cookie = localStorage.getItem("cookie");

        function reqListener() {
            resolve(this);
        }
        const request = new XMLHttpRequest();
        request.addEventListener("load", reqListener);
        request.open(method, path);
        request.setRequestHeader("x-method", method);
        request.setRequestHeader("x-path", path);
        if (cookie && cookie.length)
            request.setRequestHeader("x-authcookie", cookie);
        if (data) {
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(data));
        } else {
            request.send();
        }
    });
    return promise;
}
