// import $ from 'jquery';
import utilities from '../../helpers/utilities';
import 'bootstrap';
import boardData from '../../helpers/data/boardData';

import './allBoards.scss';

const buildSingleBoard = (oneBoard) => {
  let string = '';
  string += `<div class="card bg-dark text-white single-board">
  <div class="card-img-overlay">
    <h5 class="card-title">${oneBoard.name}</h5>
  </div>
  </div>`;
  return string;
};

const buildAllBoards = () => {
  boardData.getBoards()
    .then((boards) => {
      let domString = '<div class="all-boards">';
      boards.forEach((board) => {
        domString += buildSingleBoard(board);
      });
      domString += '</div>';
      utilities.printToDom('board-zone', domString);
    })
    .catch((error) => console.error(error));
};

export default { buildAllBoards };
