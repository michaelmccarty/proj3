import axios from "axios";
// const url = 'http://localhost:3001'
export default {
    
    login: function(data) {
        return axios.post('/login', data);
    },

    register: function(data) {
        return axios.post('/api/users', data);
    },

    logout: function() {
        return axios.get('/logout');
    },

    isLoggedIn: function () {
        let cookies = document.cookie.split(";");
        cookies = cookies.reduce((aggregatedCookies, cookie) => {
            const [key, value] = cookie.split("=");
            aggregatedCookies[key] = value === "true" ? true : ( value === "false" ? false : value );
            return aggregatedCookies;
        }, {});

        return cookies.isLoggedIn;
    }
};