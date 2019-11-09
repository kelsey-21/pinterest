import axios from 'axios';
import apiKeys from '../apiKeys.json';
import pinData from './pinData';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`) // add in uid limit
    .then((response) => {
      const allBoards = response.data;
      const boards = [];
      Object.keys(allBoards).forEach((boardId) => {
        allBoards[boardId].id = boardId;
        boards.push(allBoards[boardId]);
      });
      resolve(boards);
    })
    .catch((error) => reject(error));
});

const getListofBoards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json`)
    .then((response) => {
      const allBoards = response.data;
      const boards = [];
      Object.keys(allBoards).forEach((boardId) => {
        allBoards[boardId].id = boardId;
        boards.push(allBoards[boardId]);
      });
      const boardNames = boards.map((b) => b.name);
      // const newBoards = boards.map(({ name }) => name);
      resolve(boardNames);
    })
    .catch((error) => reject(error));
});

const deleteBoardsbyId = (boardId) => {
  axios.delete(`${baseUrl}/boards/${boardId}.json`);
  pinData.getAllPinsByBoardId(boardId).then((pins) => {
    for (let i = 0; i < pins.length; i += 1) {
      pinData.deletePinbyId(pins[i].id);
    }
  }).catch((error) => console.error(error));
};

export default { getBoards, getListofBoards, deleteBoardsbyId };
