// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
} from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyANUy21s0rQyztrxN-0fY1bZyeA2EltQE8',
  authDomain: 'academic-projects-df17c.firebaseapp.com',
  projectId: 'academic-projects-df17c',
  storageBucket: 'academic-projects-df17c.appspot.com',
  messagingSenderId: '344151251321',
  appId: '1:344151251321:web:072f6420ef503110d7b7a8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export const addMore = (data) => {
  if (auth.currentUser) {
    const user = auth.currentUser;
    setDoc(doc(db, 'users', user.uid), data);
  } else {
    console.warn('Error');
  }
};

export const saveCard = (front, back) => {
  if (auth.currentUser) {
    const user = auth.currentUser;
    addDoc(collection(db, `users/${user.uid}/cards`), { front, back });
  } else {
    console.log('Please Login');
  }
};

// export const getCards = () => getDocs(collection(db, 'users'));
export const userData = () =>
  getDoc(doc(db, 'users', localStorage.getItem('user')));

export const onGetCards = (callback) => {
  const user = localStorage.getItem('user');
  console.log(user);
  if (user) onSnapshot(collection(db, `users/${user}/cards`), callback);
};

export const deleteCard = (id) => {
  if (auth.currentUser) deleteDoc(doc(db, auth.currentUser.uid, id));
};

export const createAccount = async (email, password, data) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), data);
      window.location.replace('./home.html');
      localStorage.setItem('user', user.uid);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const loginUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem('user', user.uid);
      window.location.replace('./home.html');
    })
    .catch((e) => {
      console.error(e);
    });
};

export const Logout = () => {
  signOut(auth)
    .then(() => {
      window.location.replace('/index.html');
    })
    .catch((e) => {
      console.log(e);
    });
};

onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;
  if (user) {
    const uid = user.uid;
    console.log('Observer', uid);
    console.log(path);
    if (
      path == '/html/login.html' ||
      path == '/' ||
      // path == '/html/registro.html' ||
      path == '/index.html'
    )
      if (path == '/' || path == '/index.html')
        window.location.replace('./html/home.html');
      else window.location.replace('./home.html');
  } else {
    console.log('ObserverLogout');
    localStorage.removeItem('user');
    console.log(path);
    if (
      path == '/html/casos_clinicos.html' ||
      path == '/html/usuario.html' ||
      path == '/html/FlashCards.html' ||
      path == '/html/home.html'
    )
      window.location.replace('/index.html');
  }
});
