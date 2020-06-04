import api from '../api'

class AuthService {
    constructor(){
        this.authenticated = false
        this.auth_token = false
    }

    isAuthenticated(){
        return this.authenticated
    }

    async login(email, password){
        const resp = await api.post("/login", {email, password})

        if (resp.status !== 200) {
            // do something if login fails
        }

        // everything succeeded so save token and allow user to continue
        const { token } = resp.data
        localStorage.setItem("auth_token", token)
        this.authenticated = true
        this.auth_token = token
    }

    async logout(){
        this.authenticated = false
        this.auth_token = null
        localStorage.removeItem("auth_token")
    }
}

const auth = new AuthService()

export default auth