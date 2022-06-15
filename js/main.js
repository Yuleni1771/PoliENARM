import { loginUser } from './firebase.js';

const loginForm = document.getElementById('login');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const userEmail = loginForm['email'];
  const userPassword = loginForm['password'];

  console.log(userEmail.value, userPassword.value);

  loginUser(userEmail.value, userPassword.value);

  userEmail.value = '';
  userPassword.value = '';
});
