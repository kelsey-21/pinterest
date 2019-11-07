// import utilities from '../../helpers/utilities'
import $ from 'jquery';
import pinData from '../../helpers/data/pinData';
import utilities from '../../helpers/utilities';

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

export default { showSingleBoard };
