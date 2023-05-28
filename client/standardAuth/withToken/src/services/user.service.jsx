import axios from 'axios';
import { apisUrl } from '../const';
axios.defaults.withCredentials = true;

const signup = async (username, password) => {
  const response = await axios.post(apisUrl + 'signup', {
    username,
    password
  });
  return response.data;
};

const signin = async (username, password) => {
  const response = await axios.post(apisUrl + 'signin', {
    username,
    password
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
  signup,
  signin,
  signout,
  amilogged,
  usergetaction,
  userpostaction,
  userpostactionabac,
  getcsrftoken
};
export default UserService;
