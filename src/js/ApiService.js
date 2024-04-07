import axios from 'axios';

const ApiService = axios.create({
    baseURL: "http://localhost:8081/api/v1/demo",
    timeout: 30000
});

export default ApiService;
