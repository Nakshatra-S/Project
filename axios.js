import axios from 'axios';
const authFetch = axios.create({
    baseURL:'http://localhost:3000',
});

authFetch.interceptors.request.use(
  (request) => {
    console.log('request sent');
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
authFetch.interceptors.response.use(
  (response) => {
    console.log('got response');
    return response;
  },
  (error) => {
    console.log(error.response);
    if(error.response.status === 404)
    {
        console.log('NOT FOUND');
    }
    return Promise.reject(error);
  }
);
export default authFetch;