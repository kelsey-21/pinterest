import $ from 'jquery';
import firebase from 'firebase';
import 'bootstrap';

import utilities from '../../helpers/utilities';
import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';

import './allBoards.scss';

const hideBoards = $('#board-zone');

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
    $('#pin-zone').empty().remove();
    // eslint-disable-next-line no-use-before-define
    buildAllBoards(uid);
  } else if (target.includes('edit')) {
    console.log('edit');
  }
  // if (targets.includes('close')) {
  //   $('#pin-zone').empty().remove();
  //   // eslint-disable-next-line no-use-before-define
  //   buildAllBoards(uid);
  // $('#pin-zone').on('hover', hoverEvent);
  // $('#pin-zone').hover(hoverHandler).find('.edit-pin').hide();
  // $('.edit-pin').click(clickHandler);
};

const showSingleBoard = (e) => {
  const boardId = e.target.id;
  let domString = '<div id="pin-zone" class="container d-flex flex-wrap">';
  domString += `<h2 class="pin-header">${boardId}</h2>`;
  pinData.getAllPinsByBoardId(boardId)
    .then((pins) => {
      hideBoards.empty().remove();
      pins.forEach((pin) => {
        domString += `<div id="${pin.id}" class="card single-pin" style="width: 18rem;">
        <div class="card-img-overlay">
          <i id="edit-${pin.id}" class="fas fa-pen edit-pin"></i>
        </div>
        <img src="${pin.imageUrl}" class="card-img-top" alt="${pin.description}">
        <div class="card-body">
          <h5 class="card-title" id="pin-${pin.boardId}">Board</h5>
        </div>
        </div>`;
      });
      domString += '</div>';
      utilities.printToDom('single-board', domString);
      $('#single-board-button').find('#close-board').show();
      document.getElementById('single-board-button').addEventListener('click', clickHandler);
      document.getElementById('pin-zone').addEventListener('click', clickHandler);
      document.getElementById('pin-zone').addEventListener('hover', hoverHandler);
    })
    .catch((error) => console.error(error));
};

const buildSingleBoard = (oneBoard) => {
  let string = '';
  string += `<div id="${oneBoard.id}" class="card bg-dark text-white single-board">
  <div class="card-img-overlay">
    <h5 class="card-title">${oneBoard.name}</h5>
  </div>
  </div>`;
  return string;
};

const buildAllBoards = (uid) => {
  boardData.getBoards(uid)
    .then((boards) => {
      let domString = '<div class="container d-flex flex-wrap all-boards">';
      boards.forEach((board) => {
        domString += buildSingleBoard(board);
      });
      domString += '</div>';
      utilities.printToDom('board-zone', domString);
      $('#board-zone').on('click', '.single-board', showSingleBoard);
    })
    .catch((error) => console.error(error));
};

export default { buildAllBoards };
