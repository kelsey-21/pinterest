import firebase from 'firebase';
import pinData from './pinData';
import boardData from './boardData';

const getBoardNameForPins = (boardId) => new Promise((resolve, reject) => {
  const { uid } = firebase.auth().currentUser;
  boardData.getBoards(uid).then((boards) => {
    pinData.getAllPinsByBoardId(boardId).then((pins) => {
      const newPins = [];
      pins.forEach((pin) => {
        const newPin = { ...pin };
        const getPinBoard = boards.find((x) => x.id === newPin.boardId);
        if (getPinBoard) {
          newPin.boardName = getPinBoard.name;
        }
        newPins.push(newPin);
      });
      resolve(newPins);
    });
  })
    .catch((error) => reject(error));
});

const getPinsandBoards = (boardId) => new Promise((resolve, reject) => {
  const { uid } = firebase.auth().currentUser;
  console.log(uid);
  pinData.getAllPinsByBoardId(boardId).then((pins) => {
    boardData.getBoards(uid).then((boards) => {
      const newBoards = [];
      pins.forEach((pin) => {
        const newPin = { ...pin };
        const getPinBoard = boards.find((x) => x.id === newPin.boardId);
        if (getPinBoard) {
          newPin.boardName = getPinBoard.name;
        }
        newBoards.push(newPin);
      });
      console.log('newboards', newBoards);
      resolve(newBoards);
    });
  }).catch((error) => reject(error));
});

export default { getBoardNameForPins, getPinsandBoards };
