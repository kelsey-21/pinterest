import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const allPins = response.data;
      const pins = [];
      Object.keys(allPins).forEach((pId) => {
        allPins[pId].id = pId;
        pins.push(allPins[pId]);
      });
      resolve(pins);
    })
    .catch((error) => reject(error));
});

export default { getAllPinsByBoardId };
