import $ from 'jquery';
import firebase from 'firebase';

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
    <h5 class="card-title">${oneBoard.name}</h5>
    <a id="deleteBoard-${oneBoard.id}" class="delete-board-link" href="#">Delete board</a>
  </div>
  </div>`;
  return string;
};

const printEditandDeleteModal = (pinId, boardId) => {
  const { uid } = firebase.auth().currentUser;
  boardData.getListofBoards(uid)
    .then((boardlist) => {
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
          <div class="btn-group">
            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Change Board
            </button>
            <div class="dropdown-menu">`;
      for (let i = 0; i < boardlist.length; i += 1) {
        domString += `<a class="dropdown-item" href="#">${boardlist[i]}</a>`;
      }
      domString += '</div></div>';
      domString += `<div class="modal-footer"><button id="${pinId}" data-dismiss="modal" type="button" class="btn btn-secondary delete-pin">Delete Pin
      </button><button type="button" class="btn btn-primary">Save changes</button></div>`;
      domString += '</div></div></div>';
      utilities.printToDom('modal', domString);
      $('.delete-pin').on('click', (() => {
        pinData.deletePinbyId(pinId)
          .then(() => {
            // eslint-disable-next-line no-use-before-define
            showSingleBoard(boardId);
          });
      }));
    })
    .catch((error) => console.error(error));
};

const showSingleBoard = (boardId) => {
  const counter = utilities.idGenerator();
  let domString = '<div id="pin-zone" class="container">';
  domString += `<div id="addNewPin" class="card single-pin add-single-pin" style="width: 18rem;">
        <div id="newpin-${boardId}" data-toggle="modal" data-target="#newPinModal" class="card-img-overlay"></div>
        <img src="${picture}" class="card-img-top" alt="add-image" />
        <div class="card-body"><h5 class="card-title">Add Pin</h5></div>
        </div>`;
  smashData.getBoardNameForPins(boardId)
    .then((pins) => {
      pins.forEach((pin) => {
        domString += `<div id="${pin.id}" class="card single-pin" style="width: 18rem;">
        <div class="card-img-overlay"><i data-toggle="modal" data-target="#exampleModalCenter" id="edit-${counter}" class="fas fa-pen edit-pin"></i></div>
        <img src="${pin.imageUrl}" class="card-img-top" alt="${pin.description}" />
        <div class="d-flex justify-content-between card-body"><h5 class="card-title" id="pin-${pin.boardId}">Add Comment</h5><i class="fas fa-plus"></i></div>
        </div>`;
        printEditandDeleteModal(`${pin.id}`, `${pin.boardId}`);
      });
      domString += '</div>';
      $('#single-board-button').find('#close-board').show();
      utilities.printToDom('board-zone', domString);
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
