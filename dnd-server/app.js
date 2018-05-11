const connection = require("./connection");
const uuid = require("uuid/v4");
const utils = require("./utils");
const schemas = require("./schemas");
const errors = require("./errors");


const crypto = require("crypto");
const express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Path, X-Method, X-Authcookie");
  next();
});
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/**
   checks that arguments are of the correct type.
   @param {Arguments|Array} args - The arguments to the function
   @param {Array.<string>} types - The expected typeof each arg.
   @param {Array.<string>} names - The parameter names
   @param {Array.<string>} typeNames - The expected parameter type names
   @return {Object} {valid: bool, reason: string?}
*/
function checkArgs(args, types, typeNames, names){
    if(args.length != types.length || args.length != names.length){
		return {valid: false,
				reason: `Invalid number of arguments. Received ${args.length}. Expected ${types.length}.`}; 
    }
    
    for(let i = 0; i < args.length; ++i){
		if(!types[i](args[i])){
			return {valid: false,
					reason: `Invalid type of argument ${i} (${names[i]}). Received '${typeof args[i]}'. Expected '${typeNames[i]}'.`}; 
		}
    }
    return {valid: true};
};


async function getAll(req){
    let collection = (await connection.open());
	collection = collection[req.params.collection];
    const cursor = await collection.find({});
    const all = await cursor.toArray();
    return [200, all];
};

async function getOne(req){
    const collection = (await connection.open())[req.params.collection];
    const one = await collection.findOne({_id: req.params.id});
    if(!one)
		return errors.NOT_FOUND;
    return [200, one];
};

async function createObject(req, res){
    const collection = (await connection.open())[req.params.collection];
    const elem = req.body;
    if(schemas.isNotValid(req.params.collection, elem))
		return errors.NOT_VALID;
    elem._id = uuid();
    await collection.insertOne(elem);
    return [200, elem._id];
};

async function createUser(req){
	const user = req.body;
	console.log(user);
	if(schemas.isNotValid("NewUser", user))
		return errors.NOT_VALID;
	const collection = (await connection.open())["User"];
    const one = await collection.findOne({username: user.username});
    if(one)
		return errors.NAME_TAKEN;
    user._id = uuid();
	user.characters = [];
	const cookie = user._id + "$" + (crypto.createHash('sha256')
									 .update(user.password)
									 .digest('base64'));
	delete user.password;
	user.cookie = cookie;
    await collection.insertOne(user);
    return [200, {success:true, cookie}];
}

async function updateObject(req){
    const collection = (await connection.open())[req.params.collection];
    const elem = req.body;
    if(schemas.isNotValid(req.params.collection, elem))
		return errors.NOT_VALID;
    const res = await collection.updateOne({_id: req.params.id},
										   {$set:
											elem
										   });
    if(!res.result.n)
		return errors.NOT_FOUND;
    elem._id = req.params.id;
    return [200, elem];
};

async function patchObject(req){
    const collection = (await connection.open())[req.params.collection];
    const id = req.params.id;
    const elem = req.body;
    const old = await getOne(req);
    const res = await collection.updateOne({_id: req.params.id},
										   {$set:
											elem
										   });
    if(!res.result.n)
		return errors.NOT_FOUND;
    let cur = (await getOne(req))[1];
    delete cur._id;
    if(schemas.isNotValid(req.params.collection, elem)){
		req.params.id = id;
		delete old._id;
		req.body = old;
		await updateObject(req);
		return errors.NOT_VALID;
	}
	cur._id = req.params.id;
	return [200, cur];
};

async function deleteObject(req){
    const collection = (await connection.open())[req.params.collection];
    const res = await collection.deleteOne({_id: req.params.id});
    if(!res.result.n)
		return errors.NOT_FOUND
    return [200, undefined];
};

async function dropCollection(req){
	console.log("Dropping Table:", req.params.collection);
    try{
		const collection = (await connection.open())[req.params.collection];
		await collection.drop();
    }catch(e){}
    return [200, "ok"];
};

async function errorClose(e){
    (e && e.toString) || (e = "Something went wrong");
    await connection.close();
    return [500, {error:e.toString(), meme:"https://http.cat/500"}];
}

function resolver(p){
    const promise = new Promise((resolve, reject) => {
		p.then(data => resolve(data)).catch(err => resolve(new Error(err)));
    });
    return promise;
}

async function getUser(req){
	const cookie = req.headers["x-authcookie"];
    if(cookie){
		const collection = (await connection.open())["User"];
		const user = await collection.findOne({
			cookie
		});
		if(user)
			return user;
    }
    return false;
}

function bind(fn, priv, path){
    return async(req, res, next) => {
		console.log(req.headers);
		let user = null;
		let calling = fn;
		if(priv){
			user = await getUser(req, res, next);
			if(!user){
				calling = priv;
			}
		}
		try{
			const result = await (utils.on_die(calling, errorClose).call(this, req, res, next, user));
			if(!result)
				return;
			const code = result[0];
			if(result[1] === undefined)
				res.status(code).send("");
			else if(typeof result[1] !== "string")
				res.status(code).json(result[1]);
			else
				res.status(code).send(result[1]);
		}catch(e){
			res.status(500).json({error:"Something fucked up bad. Probably mongodb isn't running", meme:"https://http.cat/500"});
		}
    };
}

function webAPI(api, port){
    for(let methodName in api){
		const name = methodName.toLowerCase();
		//const method = app[];
		const list = api[methodName];
		for(let i = 0; i < list.length; ++i){
			const def = list[i];
			app[name](def[0], upload.array(), bind(def[1], def[2], def[0]));
		}
    }
    app.listen(port, function() {
		console.log("Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it");

		if (process && process.send) process.send({done: true}); // ADD THIS LINE
    });
    
}

async function login(req, res, path){
    const usnm = req.body.username,
		  pass = req.body.password;
    const collection = (await connection.open())["User"];
	const user = await collection.findOne({
		username:usnm
	});

	if(!user)
		return errors.NO_SUCH_USER;
	
	const cookie = user._id + "$" + crypto.createHash('sha256')
          .update(pass)
          .digest('base64');

	
    if(user.cookie == cookie){
		return [200, {cookie, success:true}];
    }
    return errors.BAD_PASSWORD;
}

function privateBlocked(){
	return [401, {meme:"https://http.cat/401", error:"Not Logged in"}];
}

let port = 3001;
try{
    port = process.env.PORT || port;
}catch(e){}
/*
try{
	dropCollection({params:{
		collection:"User"
	}});
}catch(e){}
*/
app.use(express.static('public'));
webAPI({
    GET: [
		["/store/:collection", getAll, privateBlocked],
		["/store/:collection/:id", getOne, privateBlocked]
    ],
    POST: [
		["/store/:collection", createObject, privateBlocked],
		["/users/new", createUser],
		["/users/login", login]
    ],
    PUT: [
		["/store/:collection/:id", updateObject, privateBlocked]
    ],
    PATCH: [
		["/store/:collection/:id", patchObject, privateBlocked]
    ],
    DELETE:[
		["/store/:collection/:id", deleteObject, privateBlocked],
		["/store/:collection", dropCollection, privateBlocked]
    ]
}, port);
