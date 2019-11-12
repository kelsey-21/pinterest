import $ from 'jquery';
import firebase from 'firebase';
import 'bootstrap';
import './allBoards.scss';

import utilities from '../../helpers/utilities';
import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';

import singleBoard from '../singleBoard/singleBoard';
// import createNewPin from '../singleBoard/createNewPin';


const buildAllBoards = (uid) => {
  boardData.getBoards(uid)
    .then((boards) => {
      let domString = '';
      domString += '<div class="container all-boards">';
      domString += '<div id="add-new-board2" class="card text-white single-board-add" data-toggle="modal" data-target="#boardModalCenter"><div>';
      domString += '<h5 class="card-title">Add Board</h5></div></div>';
      boards.forEach((board) => {
        domString += singleBoard.buildSingleBoard(board);
      });
      domString += '</div>';
      utilities.printToDom('board-zone', domString);
      $('#single-board-button').find('#close-board').hide();
    })
    .catch((error) => console.error(error));
};

const createNewBoard = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newBoard = {
    id: utilities.idGenerator(),
    name: $('#board-name-input').val(),
    isPrivate: $('#private-checkbox').is(':checked'),
    uid,
    description: $('#board-description').val(),
  };
  boardData.addNewBoard(newBoard)
    .then(() => {
      $('#boardModalCenter').modal('hide');
      buildAllBoards(uid);
    })
    .catch((error) => console.error(error));
};

const deleteBoard = (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const boardId = e.target.id.split('deleteBoard-')[1];
  boardData.deleteBoardsbyId(boardId)
    .then(() => {
      pinData.getAllPinsByBoardId(boardId).then((pins) => {
        pins.forEach((pin) => pinData.deletePinbyId(pin.id));
      });
      buildAllBoards(uid);
      $('#single-board-button').find('#close-board').hide();
    })
    .catch((error) => console.error(error));
};

const hoverHandler = (event) => {
  const target = $(event.target);
  if (target.is('.single-pin')) {
    target.children('.edit-pin').show();
  }
};

const clickHandler = (e) => {
  const { uid } = firebase.auth().currentUser;
  const target = e.target.id;
  if (target === 'close-board') {
    buildAllBoards(uid);
  } else {
    $('#myModal').modal('show');
  }
};

const eventHandler = () => {
  $('#board-zone').on('click', '.delete-board-link', deleteBoard);
  document.getElementById('single-board-button').addEventListener('click', clickHandler);
  $('#board-zone').on('click', '#pin-zone', clickHandler);
  $('#board-zone').on('hover', '.single-board', hoverHandler);
  $('#board-zone').on('click', '.single-board', singleBoard.clickMiddle);
  $('#add-board-save').on('click', createNewBoard);
};


$('body').on('click', eventHandler);


export default { buildAllBoards };
