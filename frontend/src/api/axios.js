import axios from 'axios';

const API = axios.create({
  baseURL: 'https://prodops-7umt.onrender.com/api'
});

export default API;