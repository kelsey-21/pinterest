import $ from 'jquery';
import firebase from 'firebase';
import utilities from '../../helpers/utilities';
import 'bootstrap';
import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';

import './allBoards.scss';

const hideBoards = $('#board-zone');

const showSingleBoard = (e) => {
  const { uid } = firebase.auth().currentUser;
  const boardId = e.target.id;
  let domString = '<div id="pin-zone" class="container d-flex flex-wrap">';
  domString += `<div class="row pin-header">
    <h2>${boardId}</h2><i class="fas fa-times close"></i></div>`;
  pinData.getAllPinsByBoardId(boardId)
    .then((pins) => {
      hideBoards.empty();
      pins.forEach((pin) => {
        domString += `<div class="card single-pin" style="width: 18rem;">
        <img src="${pin.imageUrl}" class="card-img-top" alt="${pin.description}">
        <div class="card-body">
          <h5 class="card-title" id="pin-${pin.boardId}">Board</h5>
        </div>
        </div>`;
      });
      domString += '</div>';
      utilities.printToDom('single-board', domString);
      $('#pin-zone').on('click', '.close', () => {
        $('#pin-zone').empty();
        // eslint-disable-next-line no-use-before-define
        buildAllBoards(uid);
      });
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
      let domString = '<div class="all-boards">';
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
