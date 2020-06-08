import api from '../api'
import { observable, action } from 'mobx'

class AuthStore {
	@observable authenticated = false
	@observable auth_token = null

	setAuthentication(token) {
		this.authenticated = true
		this.auth_token = token
		localStorage.setItem('auth_token', token)
		return null
	}

	// Deprecated: no longer needed
	@action.bound
	isAuthenticated() {
		return this.authenticated
	}

	@action.bound
	async login(email, password) {
		const resp = await api.post('/login', { email, password })

		if (resp.status !== 200) {
			// do something if login fails
			return
		}

		// everything succeeded so save token and allow user to continue
		const { token } = resp.data
		this.setAuthentication(token)
	}

	@action.bound
	async logout() {
		this.authenticated = false
		this.auth_token = null
		localStorage.removeItem('auth_token')
	}

	@action.bound
	async register(userInfo) {
		const resp = await api.post('/user', userInfo)
		if (resp.status !== 201) {
            // do something in case of error
            console.log(resp.data)
			alert('Something went wrong: ' + resp.data)
			return resp.data.error
		}
		return null
	}
}

export default AuthStore
