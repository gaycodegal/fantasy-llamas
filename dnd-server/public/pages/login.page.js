async function main() {
    const c = await UserForm("/users/login");
    $("main").first().append(c);
}
main();
