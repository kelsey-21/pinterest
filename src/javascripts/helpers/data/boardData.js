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
      // const boardObj = {};
      Object.keys(allBoards).forEach((boardId) => {
        allBoards[boardId].id = boardId;
        boards.push(allBoards[boardId]);
      });
      resolve(boards);
    })
    .catch((error) => reject(error));
});

const deleteBoardsbyId = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

const addNewBoard = (newBoard) => axios.post(`${baseUrl}/boards.json`, newBoard);

export default {
  getBoards,
  getListofBoards,
  deleteBoardsbyId,
  addNewBoard,
};
