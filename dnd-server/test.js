const http = require("http");
const tests = require("./test-case");
console.log("hi");
function request(method, url, data, cookie){
    method = method.toUpperCase();
    const parts = url.split("/");
    const host = parts[0].split(":");
    const hostname = host[0];
    const port = parseInt(host[1] || process.env.PORT || 3000);
    const path = [""].concat(parts.slice(1)).join("/");
    const opts = {hostname, method, port, path};
	if(typeof data != "string")
		data = JSON.stringify(data);
	console.log("sending", data);
    if(data){
		opts.headers = {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(data)
		}
    }else{
		opts.headers = {};
	}
	if(cookie){
		opts.headers['x-authcookie'] = cookie;
	}
	opts.headers["x-path"] = path;
	opts.headers["x-method"] = method;
    
    return new Promise((resolve, err) => {
		const req = http.request(opts, (resp)=>{
			let data = [];
			
			// A chunk of data has been recieved.
			resp.on('data', (chunk) => {
				data.push(chunk);
			});
			
			// The whole response has been received. Print out the result.
			resp.on('end', () => {
				console.log(resp.statusCode);
				const s = Buffer.concat(data).toString();
				try{
					resolve(JSON.parse(s));
				}catch(e){
					resolve(s);
				}
			});	    
		});
		if(data)
			req.write(data);
		req.end();
    });    
}

async function main () {
    let resp = 0;
	const u = undefined;
	resp = await request("post", "localhost/users/new", tests.user);
	console.log(resp);
	resp = await request("post", "localhost/users/login", tests.user);
	console.log(resp);
	const cookie = resp.cookie;
    resp = await request("delete", "localhost/store/Spell", u, cookie);
    console.log(resp);
    
    resp = await request("get", "localhost/store/Spell", u, cookie);
    console.log(resp);
	console.log("sending: ", tests.first);
    resp = await request("post", "localhost/store/Spell",
						 JSON.stringify(tests.first), cookie);
    console.log(resp);
    resp = await request("get", "localhost/store/Spell/" + resp, u, cookie);
    console.log(resp);
    
}

main();
