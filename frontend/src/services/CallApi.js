import axios from 'axios'

const url = 'http://localhost:5000/api/'
const urlpost = url + 'post'
const urlComments = url + 'comment' 
const userData = JSON.parse(localStorage.getItem('user'))


class CallApi {

    // for login
    login(user) {
        return axios 
        .post(url + 'user/login', {
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
        return axios.post(url + 'user/signup', {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            fonction: user.fonction
        })
    }

    getPosts() {
        return axios.get(urlpost, {
            headers: {
                Authorization: `Bearer ${userData.token}`,
                "Content-type": "application/json"
          }
        })

    }

    getComments () {
        return axios.get(urlComments, {
            headers: {
                Authorization: `Bearer ${userData.token}`,
                "Content-type": "application/json"
          }
        })
    }

}

export default new CallApi() 