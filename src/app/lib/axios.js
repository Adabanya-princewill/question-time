import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://qt.organogram.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
