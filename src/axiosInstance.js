import axios from 'axios';

const fetchClient = () => {
  const defaultOptions = {
    // baseURL: "http://localhost:5000",
    baseURL: "https://blog-app4699.herokuapp.com/",
    // method: 'get',
    headers: {
        'Content-Type': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    console.log(token);
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default fetchClient();