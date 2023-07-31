import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.baseURL = 'https://kutu-buku-apps.vercel.app/api';
// axios.defaults.baseURL = 'https://kutubuku-api.cyclic.cloud/api';

let refresh = false;

axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    try {
      if (error.response.status === 401 && !refresh) {
        refresh = true;
        const response = await axios.post('/token', {}, { withCredentials: true });

        if (response.status === 201) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.payload}`;
          error.config.headers['Authorization'] = `Bearer ${response.data.payload}`;
          return axios(error.config);
        } else if (response.status === 401) {
          return await axios.delete('/logout', { withCredentials: true });
        }
      }
    } catch (error) {
      console.log(error);
    }
    refresh = false;
    return error;
  }
);
