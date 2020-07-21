import api from '../api'
import { observable, action } from 'mobx'

class AuthStore {
	@observable authenticated = false
	@observable auth_token = null

	constructor(){
		const token = localStorage.getItem('auth_token')
		if (token){
			this.authenticated = true
			this.auth_token = token
		}
	}

	setAuthentication(token) {
		this.authenticated = true
		this.auth_token = token
		localStorage.setItem('auth_token', token)
		return null
	}

	// Deprecated: no longer needed

	@action.bound
	async login({ email, password }) {
		const resp = await api.post('/user/login', { email, password })

		if (resp.status !== 200) {
			// do something if login fails
			return resp.data.error
		}

		// everything succeeded so save token and allow user to continue
		const { token } = resp.data
		this.setAuthentication(token)
		return null
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
			return resp.data.error
		}
		return null
	}
}

export default AuthStore
