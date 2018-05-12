async function main() {
    const c = await UserForm("/users/new");
    $("main").first().append(c);
}
main();
