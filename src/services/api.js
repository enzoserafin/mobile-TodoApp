import axios from 'axios';

const api = axios.create({
  // adb reverse tcp:3333 tcp:3333
  baseURL: 'http://192.168.100.181:3333',
});

export default api;
