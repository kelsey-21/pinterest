import $ from 'jquery';
import utilities from '../../helpers/utilities';
import pinData from '../../helpers/data/pinData';
import singleBoard from './singleBoard';


const createNewPin = (boardId) => {
  // e.stopImmediatePropagation();
  const newPin = {
    name: $('#new-pin-name').val(),
    imageUrl: $('#new-pin-url').val(),
    description: '',
    categoryId: '',
    boardId,
  };
  console.log(newPin);
  $('#newPinModal').modal('hide');
  pinData.addNewPin(newPin);
  singleBoard.showSingleBoard(boardId);
};

const createNewPinModal = (e) => {
  const boardIdtest = $(e.target).closest('id');
  const boardId = e.target.id.split('newpin-')[1];
  console.log(boardIdtest);
  let domString = '';
  domString += `
  <div class="modal fade" id="newPinModal" tabindex="-1" role="dialog" aria-labelledby="newPinLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <form>
        <div class="form-group">
          <label for="new-pin-name">Add Pin</label>
          <input type="text" class="form-control" id="new-pin-name" placeholder="Enter pin name">
        </div>
        <div class="form-group">
        <label for="new-pin-url">Link</label>
        <input type="text" class="form-control" id="new-pin-url" placeholder="Enter link for pin">
      </div>
        </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button id="save-new-pin-button" type="button" class="btn btn-primary save-pin">Save changes</button>
        </div>
      </div>
    </div>
  </div>`;
  utilities.printToDom('newPin-modal', domString);
  $('#save-new-pin-button').on('click', '.save-pin', createNewPin(boardId));
};

export default { createNewPinModal };
