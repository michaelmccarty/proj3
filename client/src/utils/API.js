import axios from "axios";
// const url = 'http://localhost:3001'
export default {
    
    login: function(data) {
        return axios.post('/login', data);
    },

    register: function(data) {
        return axios.post('/api/users', data);
    }
};