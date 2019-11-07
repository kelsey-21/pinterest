import $ from 'jquery';
import utilities from '../../helpers/utilities';
import 'bootstrap';
import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';

import './allBoards.scss';

const hideBoards = $('#board-zone');

const showSingleBoard = (e) => {
  hideBoards.addClass('hide');
  const boardId = e.target.id;
  let domString = '<div id="pin-zone" class="d-flex">';
  pinData.getAllPinsByBoardId(boardId)
    .then((pins) => {
      pins.forEach((pin) => {
        domString += `<div class="card" style="width: 18rem;">
        <img src="${pin.imageUrl}" class="card-img-top" alt="${pin.description}">
        <div class="card-body">
          <h5 class="card-title" id="pin-${pin.boardId}">Board</h5>
        </div>
        </div>`;
      });
      domString += '</div>';
      utilities.printToDom('single-board', domString);
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
