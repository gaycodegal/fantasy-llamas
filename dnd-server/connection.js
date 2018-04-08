const MongoClient = require("mongodb").MongoClient;
const config = require("./settings");
const utils = require("./utils");
let _connection = null, _db = null, _collections = {};
async function open(){
    if(!_connection){
		_connection = await MongoClient.connect(config.url);
		_db = await _connection.db(config.db);
		for(let i = 0; i < config.collections.length; ++i){
			const key = config.collections[i];
			_collections[key] = await _db.collection(key);
		}
    }
    return _collections
}

async function close(){
	for(let i = 0; i < config.collections.length; ++i){
		const key = config.collections[i];
		await _collections[key].close();
	}
    _connection = null;
    _db = null;
    _collections = {};
}

module.exports = {open:utils.on_die(open, close), close};
