import { onGetCards, saveCard } from './firebase.js';

const cardForm = document.getElementById('card');
const container = document.getElementById('container');

const updateCards = () => {
  console.log('update');
  onGetCards((querySnapshot) => {
    let html = '';
    querySnapshot.forEach((doc) => {
      const card = doc.data();
      html += `
      <h1>${card.front}</h1>
      <p>${card.back}</p>
      `;
    });
    container.innerHTML += html;
  });
};

cardForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const front = cardForm['front'];
  const back = cardForm['back'];

  console.log(front.value, back.value);

  if (front.value != '' || back.value != '') saveCard(front.value, back.value);

  front.value = '';
  back.value = '';
});

window.addEventListener('DOMContentLoaded', () => {
  updateCards();
});
