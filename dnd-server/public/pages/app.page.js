async function main() {
    console.log("drop table ");
    resp = await request("delete", "/store/Character"); // drop table Character
    console.log(resp.responseText);
    const char = {
        "inventory": [{name:"jeff", type:"adventure"}],
        "spells": [{ "name": "string", "level": 9, "school": "magic", "time": "100s", "range": "4m", "components": "V", "duration": "10s" }],
        "level": 1,
        "name": "string",
        "backstory": "pain & also bad childhood. fuck parents. There is blood in my fucking eyes.",
        "background": "depression",
        "class": "string",
        "race": "string",
        "stats": [{ "name": "desire for life", "value": 0 }, { "name": "gay for life", "value": 9001 }],
        "skillproficiency": [{"name": "me", "value": 1}],
        "otherproficiency": ["string"],
        "proficiencybonus": 1,
        "inspiration": -1,
        "speed": 1,
        "alignment": "string",
        "experiencepoints": 1,
        "featuresandtraits": ["string"],
        "money": 1337,
        "hp": 520
    };
    console.log("sending", char);
    resp = await request("post", "/store/Character", char);
    console.log(resp.responseText);
    const id = resp.responseText;

    console.log("getting", id);
    resp = await request("get", "/store/Character/" + id);
    const retrieved = JSON.parse(resp.responseText);
    console.log(retrieved);

    const c = await Character(retrieved);
    $("main").first().append(c);
}
main();
