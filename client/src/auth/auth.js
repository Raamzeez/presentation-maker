import api from '../api'
import { observable, action } from 'mobx'

class AuthService {
    @observable authenticated = false
    constructor(){
        this.authenticated = false
        this.auth_token = false
    }

    isAuthenticated = () =>{
        return this.authenticated
    }

    setAuthentication = (token) =>{
        this.authenticated = true
        this.auth_token = token
        localStorage.setItem("auth_token", token)
        return null
    }

    login = async (email, password) => {
        const resp = await api.post("/login", {email, password})

        if (resp.status !== 200) {
            // do something if login fails
            return
        }

        // everything succeeded so save token and allow user to continue
        const { token } = resp.data
        this.setAuthentication(token)
    }

    logout = async () => {
        this.authenticated = false
        this.auth_token = null
        localStorage.removeItem("auth_token")
    }

    register = async (userInfo) => {
        const resp = await api.post("/user", userInfo)
        if (resp.status !== 201){
            // do something in case of error
            alert("Something went wrong: " + resp.data)
            return resp.data.error
        }
        const { token } = resp.data
        return this.setAuthentication(token)
    }
}

const auth = new AuthService()

export default auth