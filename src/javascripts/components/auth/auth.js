import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import util from '../../helpers/utilities';
import google from './google.png';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loginButton = () => {
  const domString = `
    <button id="google-auth">
      <img src="${google}" />
    </button>`;
  util.printToDom('auth', domString);

  $('#google-auth').click(signMeIn);
  $('#login-button').click(signMeIn);
};

export default { loginButton, signMeIn };
