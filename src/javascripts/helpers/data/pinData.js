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

const deletePinbyId = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const addNewPin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

const updatePin = (pinId, updatedPin) => axios.put(`${baseUrl}/pins/${pinId}.json`, updatedPin);

const preUpdatePin = (pinId, newBoardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinId}.json`)
    .then((response) => {
      const pinObj = response.data;
      pinObj.boardId = newBoardId;
      updatePin(pinId, pinObj);
      resolve();
    })
    .catch((error) => reject(error));
});

export default {
  getAllPinsByBoardId,
  deletePinbyId,
  addNewPin,
  preUpdatePin,
};
