import axios from 'axios';
import { removeToken } from '../utils/persistToken';

const instance = axios.create({ baseURL: process.env.REACT_APP_API });

axios.interceptors.response.use(response => response, error =>{
    if (error.response.status  === 401) {
        removeToken();
        window.location = '/';
    }
});

export { instance as axios };