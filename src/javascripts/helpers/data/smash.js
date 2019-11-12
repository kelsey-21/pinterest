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
            }
            newPins.push(newPin);
          });
          resolve(newPins);
        });
    })
    .catch((error) => reject(error));
});

// const getPinsForBoard = (boardId) => new Promise((resolve, reject) => {
//   const { uid } = firebase.auth().currentUser;
//   pinData.getAllPinsByBoardId(boardId)
//     .then((pins) => {
//       boardData.getBoards(uid)
//         .then((boards) => {
//           const newBoards = [];
//           boards.forEach((board) => {
//             const newBoard = { ...board };
//             const getBoardPins = pins.find((x) => x.boardId === newBoard.id);
//             if (getBoardPins) {
//               newBoard.pinImageUrl = getBoardPins.imageUrl;
//             }
//             newBoards.push(newBoard);
//             console.log(newBoards);
//           });
//           resolve(newBoards);
//         });
//     })
//     .catch((error) => reject(error));
// });

// const init = () => {
//   console.log('running');
//   getPinsForBoard('board2');
// };

// init();

export default { getBoardNameForPins };
