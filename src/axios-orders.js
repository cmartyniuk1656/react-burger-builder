import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-819cf.firebaseio.com/'
});

export default instance;