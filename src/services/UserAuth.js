import axios from 'axios';
import { ApiUrl } from './ApiUrl';

const UserAuth = axios.create({
  baseURL: `${ApiUrl}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default UserAuth;