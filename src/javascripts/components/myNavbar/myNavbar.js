import './myNavbar.scss';

import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const authDiv = $('#auth');
const logoutButton = $('#navbar-logout');
const showBoards = $('#board-zone');
const welcome = $('#welcome');

const logoutEvent = () => {
  logoutButton.click((event) => {
    event.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        authDiv.classList.add('hide');
        logoutButton.classList.add('hide');
        showBoards.classList.add('hide');
        welcome.classList.remove('hide');
      }).catch((err) => console.error('user is still logged in', err));
  });
};

export default { logoutEvent };
