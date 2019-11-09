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
import pinData from '../../helpers/data/pinData';

const hoverHandler = (event) => {
  const target = $(event.target);
  console.log('hover', target);
  if (target.is('.single-pin')) {
    target.children('.edit-pin').show();
  }
};

const clickHandler = (e) => {
  const { uid } = firebase.auth().currentUser;
  const target = e.target.id;
  console.log('clickhandler', target);
  if (target === 'close-board') {
    // eslint-disable-next-line no-use-before-define
    buildAllBoards(uid);
  } else {
    $('#myModal').modal('show');
  }
};

const deleteBoard = (e) => {
  e.preventDefault();
  const { uid } = firebase.auth().currentUser;
  const boardId = e.target.id.split('deleteBoard-')[1];
  boardData.deleteBoardsbyId(boardId)
    .then(() => {
      pinData.getAllPinsByBoardId(boardId).then((pins) => {
        pins.forEach((pin) => pinData.deletePinbyId(pin.id));
      });
      // eslint-disable-next-line no-use-before-define
      buildAllBoards(uid);
      $('#single-board-button').find('#close-board').hide();
    })
    .catch((error) => console.error(error));
};


const eventHandler = () => {
  $('#board-zone').on('click', '.delete-board-link', deleteBoard);
  document.getElementById('single-board-button').addEventListener('click', clickHandler);
  $('#board-zone').on('click', '#pin-zone', clickHandler);
  $('#board-zone').on('hover', '.single-board', hoverHandler);
  $('#board-zone').on('click', '.single-board', singleBoard.clickMiddle);
};


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
      $('#single-board-button').find('#close-board').hide();
    })
    .catch((error) => console.error(error));
};

export default { buildAllBoards };
