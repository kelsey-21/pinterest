import $ from 'jquery';
import firebase from 'firebase';
import 'bootstrap';

import utilities from '../../helpers/utilities';
import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';
import smashData from '../../helpers/data/smash';

import './allBoards.scss';

const hoverHandler = (event) => {
  const target = $(event.target);
  console.log(target);
  if (target.is('.single-pin')) {
    target.children('.edit-pin').show();
  }
};

const printEditandDeleteModal = () => {
  const { uid } = firebase.auth().currentUser;
  boardData.getListofBoards(uid).then((boardlist) => {
    console.log(boardlist);
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
            Small button
          </button>
          <div class="dropdown-menu">`;
    for (let i = 0; i < boardlist.length; i += 1) {
      domString += `<a class="dropdown-item" href="#">${boardlist[i]}</a>`;
    }
    domString += '</div></div>';
    domString += '<div class="modal-footer"><button type="button" class="btn btn-secondary">Delete Pin</button><button type="button" class="btn btn-primary">Save changes</button></div>';
    domString += '</div></div></div>';
    utilities.printToDom('modal', domString);
  }).catch((error) => console.error(error));
};

const clickHandler = (e) => {
  // const { uid } = firebase.auth().currentUser;
  const target = e.target.id;
  console.log(target);
  if (target === 'close-board') {
    $('#single-board').addClass('hide');
    $('#single-board-button').find('#close-board').hide();
    $('body').find('#board-zone').show();
  } else {
    $('#myModal').modal('show');
  }
};

const eventHandler = () => {
  document.getElementById('single-board-button').addEventListener('click', clickHandler);
  document.getElementById('pin-zone').addEventListener('click', clickHandler);
  document.getElementById('pin-zone').addEventListener('click', hoverHandler);
};

const deletePinFromBoard = (e) => {
  e.preventDefault();
  const { uid } = firebase.auth().currentUser;
  pinData.deletePinData(e.target.id).then(() => {
    // eslint-disable-next-line no-use-before-define
    buildAllBoards(uid);
    $('#single-board-button').find('#close-board').show();
    $('#board-zone').addClass('hide');
    $('body').find('#board-zone').hide();
  }).catch((error) => console.error(error));
};

const showSingleBoard = (e) => {
  const boardId = e.target.id;
  let domString = '<div id="pin-zone" class="container">';
  smashData.getBoardNameForPins(boardId)
    .then((pins) => {
      domString += `<h2 class="pin-header">${pins.boardName}</h2>`;
      pins.forEach((pin) => {
        domString += `<div id="${pin.id}" class="card single-pin" style="width: 18rem;">
        <div class="card-img-overlay"><i data-toggle="modal" data-target="#exampleModalCenter" id="edit-${pin.id}" class="fas fa-pen edit-pin"></i></div>
        <img src="${pin.imageUrl}" class="card-img-top" alt="${pin.description}" />
        <div class="card-body"><h5 class="card-title" id="pin-${pin.boardId}">Board</h5></div>
        </div>`;
      });
      domString += '</div>';
      utilities.printToDom('single-board', domString);
      printEditandDeleteModal();
      $('#single-board-button').find('#close-board').show();
      $('#board-zone').addClass('hide');
      $('body').find('#board-zone').hide();
    })
    .catch((error) => console.error(error));
};

$('body').on('click', eventHandler);

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
      let domString = '<div class="container all-boards">';
      boards.forEach((board) => {
        domString += buildSingleBoard(board);
      });
      domString += '</div>';
      utilities.printToDom('board-zone', domString);
      $('#board-zone').on('click', '.single-board', showSingleBoard);
      $('#single-board-button').find('#close-board').hide();
    })
    .catch((error) => console.error(error));
};

export default { buildAllBoards, printEditandDeleteModal, deletePinFromBoard };
