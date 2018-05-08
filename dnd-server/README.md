# DND Mongo Server

Provides a REST API for interacting with the DND Database collections.

Features include:
- Schema Validation
- Arbitrary collections, defined in [settings.json](settings.json)
- Arbitrary schemas, defined in [dnd-schemas.json](dnd-schemas.json)


## Installing

You'll need to install MongoDB, node, and npm.

Run `npm init` in this directory.


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


## Schemas

Schemas are strictly checked, and are located in [dnd-schemas.json](dnd-schemas.json).

