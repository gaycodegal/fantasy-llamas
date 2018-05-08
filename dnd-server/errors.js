module.exports = {
    NOT_FOUND: [404, {error: "recipe not found", meme:"https://http.cat/404"}],
    NOT_VALID: [400, {error: "not valid", meme:"https://http.cat/400"}],
    NOT_ACCEPTABLE: [406, {error: "NOT ACCEPTABLE", meme:"https://http.cat/406"}],
	NAME_TAKEN:[423, {error: "Account name taken.", meme:"https://http.cat/423"}],
	NO_SUCH_USER:[404, {error: "Invalid username.", meme:"https://http.cat/404"}],
	BAD_PASSWORD:[400, {error: "Invalid password.", meme:"https://http.cat/400"}]
};
