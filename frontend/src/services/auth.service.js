import axios from 'axios'


const url= 'http://localhost:3000/api/user/'


class AuthService {

    // for login
    login(user) {
        return axios 
        .post(url + 'login', {
            email: user.email,
            password: user.password
        })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data))
            }

            return response.data
        })
    }

    // for logout
    logout(){
        localStorage.removeItem('user')
    }

    // for register user
    signup(user) {
        return axios.post(url + 'signup', {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            fonction: user.fonction
        })
    }
}

export default new AuthService()