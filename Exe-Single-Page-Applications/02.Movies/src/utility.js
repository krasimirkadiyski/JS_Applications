import { homeView } from "./homePage.js";

export function clearHTML() {
    const mainContainer = document.getElementById('container');
    mainContainer.innerHTML = `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand text-light" href="/">Movies</a>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item user">
        <a class="nav-link" id="welcome-msg">Welcome, email</a>
      </li>
      <li class="nav-item user">
        <a class="nav-link" href="#">Logout</a>
      </li>
      <li class="nav-item guest">
        <a class="nav-link" href="#">Login</a>
      </li>
      <li class="nav-item guest">
        <a class="nav-link" href="#">Register</a>
      </li>
    </ul>
  </nav>
  <footer class="page-footer font-small">
    <div class="footer-copyright text-center py-3">
      © 2020
      <a href="#" class="text-dark">JS Applications</a>
    </div>
  </footer>`
}
export function logOut() {
    sessionStorage.clear();
    homeView();
}
export function handleUser() {
    const nav = document.querySelector('nav ul');
    let [greeting, logout, login, register] = (Array.from(nav.children));
    if (sessionStorage.email != null) {
        greeting.style.display = 'inline-blick';
        greeting.querySelector('a').textContent = `Hello, ${sessionStorage.getItem('email')}`
        logout.style.display = 'inline-block';
        login.style.display = 'none';
        register.style.display = 'none';
    }else{
        greeting.style.display = 'none';
        logout.style.display = 'none';
        login.style.display = 'inline-block';
        register.style.display = 'inline-block';
    }
}