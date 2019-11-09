import $ from 'jquery';
import firebase from 'firebase';
import 'bootstrap';

import utilities from '../../helpers/utilities';
import boardData from '../../helpers/data/boardData';
// import pinData from '../../helpers/data/pinData';
// import smashData from '../../helpers/data/smash';
// import modal from '../modal/modal';

import singleBoard from '../singleBoard/singleBoard';

import './allBoards.scss';

const hoverHandler = (event) => {
  const target = $(event.target);
  console.log(target);
  if (target.is('.single-pin')) {
    target.children('.edit-pin').show();
  }
};

const clickHandler = (e) => {
  const { uid } = firebase.auth().currentUser;
  const target = e.target.id;
  console.log(target);
  if (target === 'close-board') {
    // eslint-disable-next-line no-use-before-define
    buildAllBoards(uid);
  } else {
    $('#myModal').modal('show');
  }
};

const eventHandler = () => {
  document.getElementById('single-board-button').addEventListener('click', clickHandler);
  document.getElementById('pin-zone').addEventListener('click', clickHandler);
  document.getElementById('pin-zone').addEventListener('click', hoverHandler);
};

// const deletePinFromBoard = (e) => {
//   e.preventDefault();
//   // const { uid } = firebase.auth().currentUser;
//   pinData.deletePinData(e.target.id).then(() => {
//     // eslint-disable-next-line no-use-before-define
//     singleBoard.showSingleBoard();
//     $('#single-board-button').find('#close-board').show();
//   }).catch((error) => console.error(error));
// };

$('body').on('click', eventHandler);

const buildAllBoards = (uid) => {
  boardData.getBoards(uid)
    .then((boards) => {
      let domString = '<div class="container all-boards">';
      boards.forEach((board) => {
        domString += singleBoard.buildSingleBoard(board);
      });
      domString += '</div>';
      utilities.printToDom('board-zone', domString);
      $('#board-zone').on('click', '.single-board', singleBoard.clickMiddle);
      $('#single-board-button').find('#close-board').hide();
    })
    .catch((error) => console.error(error));
};

export default { buildAllBoards };
