const http = require("http");
const tests = require("./test-case");
function request(method, url, data){
    method = method.toUpperCase();
    const parts = url.split("/");
    const host = parts[0].split(":");
    const hostname = host[0];
    const port = parseInt(host[1] || process.env.PORT || 3000);
    const path = [""].concat(parts.slice(1)).join("/");
    const opts = {hostname, method, port, path};
    if(data){
		opts.headers = {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(data),
			'X-Username': "testing username",
			'Password': "testing password"
		}
    }
    
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
    resp = await request("delete", "localhost/store/Spell");
    console.log(resp);
    
    resp = await request("get", "localhost/store/Spell");
    console.log(resp);

    resp = await request("post", "localhost/store/Spell",
						 JSON.stringify(tests.first));
    console.log(resp._id);
    resp = await request("get", "localhost/store/Spell" + resp._id);
    console.log(resp);
    
}

main();
