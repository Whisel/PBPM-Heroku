import axios from 'axios';

export default axios.create({
    baseURL: 'https://measuringplacesd2.herokuapp.com/api'
});