import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import allBoards from '../../components/allBoards/allBoards';

const authDiv = $('#auth');
const logoutNavbar = $('#navbar-logout');
const showBoards = $('#board-zone');
const welcome = $('#welcome');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      logoutNavbar.removeClass('hide');
      authDiv.addClass('hide');
      showBoards.removeClass('hide');
      welcome.addClass('hide');
      allBoards.buildAllBoards(user.uid);
    } else {
      logoutNavbar.addClass('hide');
      authDiv.removeClass('hide');
      showBoards.addClass('hide');
      welcome.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
