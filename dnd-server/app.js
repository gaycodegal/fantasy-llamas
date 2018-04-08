const connection = require("./connection");
const uuid = require("uuid/v4");
const utils = require("./utils");

const errors = require("./errors");

var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
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


async function getAll(){
    const collection = (await connection.open())[req.params.collection];
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
		await updateRecipe(req);
		return errors.NOT_VALID;
	}
	cur._id = req.params.id;
	return [200, cur];
};

async function deleteRecipe(req){
    const collection = (await connection.open())[req.params.collection];
    const res = await collection.deleteOne({_id: req.params.id});
    if(!res.result.n)
		return errors.NOT_FOUND
    return [200, undefined];
};

async function dropCollection(req){
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
};

function bind(fn){
    return async(req, res, next) => {
		try{
			console.log("headers", req.headers);
			const result = await (utils.on_die(fn, errorClose).call(this, req, res, next));
			const code = result[0];
			if(result[1] === undefined)
				res.status(code).send("");
			else
				res.status(code).json(result[1]);
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
			app[name](def[0], upload.array(), bind(def[1]));
		}
    }
	console.log("live");
    app.listen(port);
}

let port = 3000;
try{
    port = process.env.PORT || port;
}catch(e){}

webAPI({
    GET: [
		["/store/:collection", getAll],
		["/store/:collection/:id", getOne]
    ],
    POST: [
		["/store/:collection/:id", createObject],
    ],
    PUT: [
		["/store/:collection/:id", updateObject]
    ],
    PATCH: [
		["/store/:collection/:id", patchObject]
    ],
    DELETE:[
		["/store/:collection/:id", deleteRecipe],
		["/drop/:collection", dropCollection]
    ]
}, port);
