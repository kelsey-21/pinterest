import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const authDiv = $('#auth');
const logoutNavbar = $('#navbar-logout');
const showBoards = $('#board-zone');
const welcome = $('#welcome');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      logoutNavbar.removeClass('hide');
      authDiv.addClass('hide');
      showBoards.classList.removeClass('hide');
      welcome.classList.addClass('hide');
    } else {
      logoutNavbar.addClass('hide');
      authDiv.removeClass('hide');
      showBoards.classList.addClass('hide');
      welcome.classList.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
