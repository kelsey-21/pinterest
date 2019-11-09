import axios from 'axios';
import apiKeys from '../apiKeys.json';

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

const deleteBoardsbyId = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

export default { getBoards, getListofBoards, deleteBoardsbyId };
