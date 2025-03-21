import axios from "axios";
const token=sessionStorage.getItem('token')||localStorage.getItem("token")
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default axios;

