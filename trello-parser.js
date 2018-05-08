var schema = {};
$(".list").each((i, x)=>{
var name = $(x).find(".js-list-name-assist")[0].textContent;
var dict = {};
$(x).find(".js-card-name").each((i, x)=>{
var nodes = x.childNodes;
var node = nodes[nodes.length - 1];
var content = node.textContent.split(":").map(x=>x.trim());
var m = /Array.<[^>]+>/g;
content[0] = content[0].toLowerCase().replace(/ |\?/g, "");
content[1] = content[1].toLowerCase().replace(/ |\?/g, "");
if(content[1].match(m))
content[1] = [content[1].substring(7, content[1].length - 1)];
dict[content[0]] = content[1];
});
schema[name] = dict;
});
JSON.stringify(schema.Spell);
