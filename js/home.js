import { Logout, userData } from './firebase.js';

const logout = document.getElementById('logout');
const name = document.getElementById('name');

window.addEventListener('DOMContentLoaded', async () => {
  const res = await userData();
  const user = res.data();

  name.textContent = user.name;
});

logout.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('ayuda');
  Logout();
});
