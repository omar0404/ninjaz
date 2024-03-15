import Config from 'react-native-config';
import axios from 'axios';

const api = axios.create({
  baseURL: Config.API_URL,
  headers: {
    'app-id': '65f42f813ccc033f54153202',
  },
});

export default api;
