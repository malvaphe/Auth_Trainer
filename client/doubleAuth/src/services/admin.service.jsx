import axios from 'axios';
import { apisUrl } from '../const';
axios.defaults.withCredentials = true;

const admingetaction = async () => {
  const response = await axios.get(apisUrl + 'admingetaction');
  return response.data;
};

const adminpostaction = async (message) => {
  const response = await axios.post(apisUrl + 'adminpostaction', {
    message
  });
  return response.data;
};

const AdminService = {
  admingetaction,
  adminpostaction
};
export default AdminService;
