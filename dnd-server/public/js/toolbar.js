async function Toolbar(user) {
    user = await user;
	const loggedIn = !!localStorage.getItem("cookie");
    let content = await make(`<header class="mdc-toolbar">
  <div class="mdc-toolbar__row">
    <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
      <a href="/${loggedIn?"home":"login"}" class="material-icons mdc-toolbar__menu-icon">home</a>
      <span class="mdc-toolbar__title">${titleize(location.pathname.substring(1))}</span>
    </section>
   <section class="mdc-toolbar__section mdc-toolbar__section--align-end">
             <a class="material-text log-link" href="/${loggedIn?"logout":"login"}">${loggedIn?"logout":"login"}</a>
   </section>
  </div>
</header>`);
    return content;
}
