import { createAccount } from './firebase.js';

const registerForm = document.getElementById('registro');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = registerForm['nombre'];
  const apellidos = registerForm['apellidos'];
  const escuela = registerForm['escuela'];
  const boleta = registerForm['boleta'];
  const user = registerForm['user'];
  const email = registerForm['email'];
  const pass = registerForm['pass'];
  const date = registerForm['date'];

  console.log(
    nombre.value,
    apellidos.value,
    escuela.value,
    boleta.value,
    user.value,
    email.value,
    pass.value,
    date.value
  );

  createAccount(email.value, pass.value, {
    name: nombre.value,
    lastname: apellidos.value,
    school: escuela.value,
    boleta: boleta.value,
    userName: user.value,
    email: email.value,
    date: date.value,
  });
});
