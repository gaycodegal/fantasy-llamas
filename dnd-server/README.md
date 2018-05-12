# DND Mongo Server

Provides a REST API for interacting with the DND Database collections.

Features include:
- Schema Validation
- Arbitrary collections, defined in [settings.json](settings.json)
- Arbitrary schemas, defined in [dnd-schemas.json](dnd-schemas.json)


## Installing

You'll need to install MongoDB, node, and npm.

Run `npm init` in this directory.


## Running

1. Launch mongod
2. You can insert your mongo credentials into the url in settings.json
3. `npm start` to start the server. 


## Seeding

No need to seed! Just run and visit [http://localhost:3000/](http://localhost:3000/) to go to the account creation page, make an account and use it as a new user would.


## REST API

You can find the method description of the REST API at the bottom of [app.js](app.js) a cached version is below:

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

As you can see, there are some lines with multiple function names associated with them. The first function will be used if the user is logged in, and the second one will be called if the user is logged out. If there is only one function listed, this will handle requests to that method + url combination.


## Demo Pages

Also provided are a few pages ([create.html](http://localhost:3001/create.html), [login.html](http://localhost:3001/login.html), [logout.html](http://localhost:3001/logout.html), [home.html](http://localhost:3001/home.html)) which demonstrate how to successfully log in, log out, create an account, and manipulate data within the REST API. 

These pages are intended for demonstration purposes only, as login sessions do not persist over different port numbers due to [origin policies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Same_origin_policy_for_JavaScript):

	Definition of an origin:

	Two pages have the same origin if the protocol, port (if one is specified), and host are the same for both pages.


## User Authentication

Users can authenticate by posting their credentials to `/users/login`. They will recieve back a JSON object with a `cookie` key. This "cookie" (not actually a cookie) needs to be passed alongside all requests as the `x-authcookie` header. In practice, you can simply use [user-requests.js](public/js/user-requests.js), which already has code for handling login, logout, and attaching proper headers for requests to the server. Example usage of requests can be seen in [demo.js](public/js/demo.js). In practice, you could just slurp the login and logout pages into a build if you serve them with the html/js/css server.

## Schemas

Schemas are strictly checked, and are located in [dnd-schemas.json](dnd-schemas.json). Schema errors will result in the `errors.NOT_VALID` [error](errors.js).


