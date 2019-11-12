import $ from 'jquery';
import firebase from 'firebase';
import 'bootstrap';

import picture from './add-new.png';
import utilities from '../../helpers/utilities';
import smashData from '../../helpers/data/smash';
import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';


import './singleBoard.scss';

const buildSingleBoard = (oneBoard) => {
  let string = '';
  string += `<div id="${oneBoard.id}" class="card bg-dark text-white single-board">
  <div>
    <h5 contentEditable="true" class="card-title">${oneBoard.name}</h5>
    <a id="deleteBoard-${oneBoard.id}" class="delete-board-link" href="#">Delete board</a>
  </div>
  </div>`;
  return string;
};

const deletePin = (pinId, boardId) => {
  pinData.deletePinbyId(pinId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      showSingleBoard(boardId);
    })
    .catch((error) => console.error(error));
};

const ModalPinClick = (e) => {
  if (e.target.id.includes('split')) {
    const pinId = e.target.id.split('-split-')[0];
    const boardId = e.target.id.split('-split-')[1];
    deletePin(pinId, boardId);
    $('#exampleModalCenter').modal('hide');
  } else {
    $('#exampleModalCenter').modal('hide');
    const pinId = e.target.id.split('-save-')[0];
    const newBoard = $('input[name=board-names]:checked').val();
    const newBoardId = newBoard.split('-value-')[1];
    // eslint-disable-next-line no-use-before-define
    pinData.preUpdatePin(pinId, newBoardId).then(() => showSingleBoard(newBoardId)).catch((error) => console.error(error));
  }
};

const printEditandDeleteModal = (e) => {
  e.stopImmediatePropagation();
  const boardId = e.target.getAttribute('data-boardId');
  const pinId = e.target.getAttribute('data-pinId');
  const { uid } = firebase.auth().currentUser;
  boardData.getListofBoards(uid)
    .then((boards) => {
      let domString = '';
      domString += `<div class="modal fade hide" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Edit Pin</h5>
          <button type="button" id="close-modal" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <h5>Change Board</h5>
        <div id="board-name-radios" class="form-check">`;
      for (let i = 0; i < boards.length; i += 1) {
        domString += `
              <div id="board-radio-inner"><input class="form-check-input" type="radio" name="board-names" id="radio-${boards[i].id}" value="${pinId}-value-${boards[i].id}" checked>
            <label class="form-check-label" for="radio-${boards[i].id}">
              ${boards[i].name}</label></input></div>`;
      }
      domString += '</div>';
      domString += '</div>';
      domString += `<div id="modal-buttons-div" class="modal-footer">
        <button id="${pinId}-split-${boardId}" data-dismiss="modal" type="button" class="btn btn-secondary delete-pin">Delete Pin</button>
        <button id="${pinId}-save-${boardId}" type="button" class="btn btn-primary save-changes">Save changes</button>
        </div>`;
      domString += '</div></div></div>';
      utilities.printToDom('modal', domString);
      $('#exampleModalCenter').modal('show');
      $('#modal-buttons-div').on('click', '.delete-pin', ModalPinClick);
      $('#modal-buttons-div').on('click', '.save-changes', ModalPinClick);
    })
    .catch((error) => console.error(error));
};


const createNewPin = (boardId) => {
  const newPin = {
    name: $('#new-pin-name').val(),
    imageUrl: $('#new-pin-url').val(),
    description: '',
    categoryId: '',
    boardId,
  };
  $('#newPinModal').modal('hide');
  pinData.addNewPin(newPin);
  // eslint-disable-next-line no-use-before-define
  showSingleBoard(boardId);
};

const createNewPinClick = (e) => {
  const target = e.target.id.split('createnewpin-')[1];
  createNewPin(target);
};

const createNewPinModal = (e) => {
  const boardId = e.target.id.split('newpin-')[1];
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
        <div id="save-new-pin-button" class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button id="createnewpin-${boardId}" type="button" class="btn btn-primary save-pin">Save changes</button>
        </div>
      </div>
    </div>
  </div>`;
  utilities.printToDom('newPin-modal', domString);
  $('#save-new-pin-button').on('click', '.save-pin', createNewPinClick);
};

const showSingleBoard = (boardId) => {
  console.log('add pin', boardId);
  let domString = '<div id="pin-zone" class="container">';
  domString += `<div id="addNewPin" class="card single-pin add-single-pin" style="width: 18rem;">
        <div id="newpin-${boardId}" data-toggle="modal" data-target="#newPinModal" class="card-img-overlay"></div>
        <img src="${picture}" class="card-img-top" alt="add-image" />
        <div class="card-body"><h5 class="card-title">Add Pin</h5></div>
        </div>`;
  smashData.getBoardNameForPins(boardId)
    .then((pins) => {
      pins.forEach((pin) => {
        domString += `
        <div id="${pin.id}" class="card single-pin" style="width: 18rem;">
          <div class="card-img-overlay">
            <i data-toggle="modal" data-target="#exampleModalCenter" id="${pin.boardId}-split-${pin.id}" data-pinId=${pin.id} data-boardId=${pin.boardId} class="fas fa-pen edit-pin"></i>
          </div>
          <img src="${pin.imageUrl}" class="card-img-top" alt="${pin.description}" />
          <div class="d-flex justify-content-between card-body"><h5 class="card-title" id="pin-${pin.boardId}">Add Comment</h5><i class="fas fa-plus"></i>
          </div>
        </div>`;
      });
      domString += '</div>';
      $('#single-board-button').find('#close-board').show();
      utilities.printToDom('board-zone', domString);
      $('.single-pin').on('click', '.edit-pin', printEditandDeleteModal);
      $('#pin-zone').on('click', '.add-single-pin', createNewPinModal);
    })
    .catch((error) => console.error(error));
};

const clickMiddle = (e) => {
  e.stopImmediatePropagation();
  const boardId = e.target.id;
  showSingleBoard(boardId);
};

export default {
  buildSingleBoard,
  showSingleBoard,
  printEditandDeleteModal,
  clickMiddle,
};
