import axios from "axios";
const url = 'http://localhost:3001'
export default {
    
    login: function(data) {
        return axios.post(url+'/login', data);
    },

    register: function(data) {
        return axios.post(url+'/api/users', data);
    }
};