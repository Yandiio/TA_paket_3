import axios from 'axios';

const $axios = axios.create({
    baseURL: '/api',
    headers: {
        Authorization: localStorage.getItem('token') != 'null' ? 'Bearer ' + localStorage.getItem('token'):'',
        'Content-type': 'application/json'  
    }
});

export default $axios;