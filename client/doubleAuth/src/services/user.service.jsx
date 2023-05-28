import axios from 'axios';
import { apisUrl } from '../const';
axios.defaults.withCredentials = true;

const signin = async (email, password, socketId, lastReq, key) => {
  const response = await axios.post(apisUrl + 'signin', {
    email,
    password,
    socketId,
    lastReq,
    key
  });
  return response.data;
};

const signmein = async (email, socketId, key) => {
  const response = await axios.post(apisUrl + 'signmein', {
    email,
    socketId,
    key
  });
  return response.data;
};

const signout = async () => {
  const response = await axios.get(apisUrl + 'signout');
  return response.data;
};

const amilogged = async () => {
  const response = await axios.get(apisUrl + 'amilogged');
  return response.data;
};

const usergetaction = async () => {
  const response = await axios.get(apisUrl + 'usergetaction');
  return response.data;
};

const userpostaction = async (message) => {
  const response = await axios.post(apisUrl + 'userpostaction', {
    message
  });
  return response.data;
};

const userpostactionabac = async (message) => {
  const response = await axios.post(apisUrl + 'userpostactionabac', {
    message
  });
  return response.data;
};

const getcsrftoken = async () => {
  const response = await axios.get(apisUrl + 'getcsrftoken');
  axios.defaults.headers.post['X-CSRF-Token'] = response.data.CSRFToken;
  return response.data;
};

const UserService = {
  signin,
  signmein,
  signout,
  amilogged,
  usergetaction,
  userpostaction,
  userpostactionabac,
  getcsrftoken
};
export default UserService;
