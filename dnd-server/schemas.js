const schemas = require("./dnd-schemas");

function valid(schema, focus) {
	console.log(schema, focus);
    if (Array.isArray(schema)) {
        if (!Array.isArray(focus))
            return false;
        const inner = schema[0];
        if (focus.length == 0)
            return true;
        const seed = [valid(inner, focus[0])].concat(focus.slice(1));
        return seed.reduce((a, b) => (a && valid(inner, b)));
    }
    const type = typeof schema;
    if (type === "string") {
        if (schema[0] == '<' && schema[schema.length - 1] == '>') {
            return valid(schemas[schema.substring(1, schema.length - 1)], focus);
        }
        return typeof focus === schema;
    }
    if (type !== typeof focus)
        return false;
    if (type === "object") {
        if (Object.keys(focus).length != Object.keys(schema).length)
            return false;
        for (const key in schema) {
            if (!focus.hasOwnProperty(key))
                return false;
            if (!valid(schema[key], focus[key]))
                return false;
        }
        return true;
    }

    return focus === schema;
}

function isNotValid(name, r) {
    console.log("checking", name, schemas[name]);
    const isvalid = valid(schemas[name], r);
    console.log("was valid", isvalid);
    return !isvalid;
}

module.exports = {
    isNotValid
};
