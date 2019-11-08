import firebase from 'firebase';
import pinData from './pinData';
import boardData from './boardData';

const getBoardNameForPins = (boardId) => new Promise((resolve, reject) => {
  const { uid } = firebase.auth().currentUser;
  boardData.getBoards(uid)
    .then((boards) => {
      pinData.getAllPinsByBoardId(boardId)
        .then((pins) => {
          const newPins = [];
          pins.forEach((pin) => {
            const newPin = { ...pin };
            const getPinBoard = boards.find((x) => x.id === newPin.boardId);
            if (getPinBoard) {
              newPin.boardName = getPinBoard.name;
              console.log(newPin);
            }
            newPins.push(newPin);
          });
          resolve(newPins);
        });
    })
    .catch((error) => reject(error));
});

export default { getBoardNameForPins };
