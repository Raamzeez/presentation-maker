import { google, oauth2_v2 } from 'googleapis'
import { readFileSync } from 'fs'
import path from 'path'
import UserAccount from './user'
import mongoose from 'mongoose'

const SCOPES = ['https://www.googleapis.com/auth/presentations.readonly']

export interface Credentials {
    refresh_token?: string | null;
    expiry_date?: number | null;
    access_token?: string | null;
    token_type?: string | null;
    id_token?: string | null;
}

class GoogleAPI {
	private OAuthClient: any

	constructor() {
		const configFile = readFileSync(
			path.resolve(__dirname, '../config/google_api.config.json')
		)
		const config = JSON.parse(configFile.toString())
		this.OAuthClient = new google.auth.OAuth2(
			config.web.client_id,
			config.web.client_secret,
			config.web.redirect_uris[0]
		)
	}

	generateAuthURL() {
		return this.OAuthClient.generateAuthUrl({
			access_type: 'offline',
			scope: SCOPES,
		})
	}

	async getTokenFromCode(code: string) {
		const token = await this.OAuthClient.getToken(code)
		return token
	}

	setToken(credentials: Credentials) {
		this.OAuthClient.setCredentials(credentials)
	}

	async getPresentation(presentationId: string) {
		const slides = google.slides({ version: 'v1', auth: this.OAuthClient })
		const presentation = await slides.presentations.get({
			presentationId,
		})
		console.log(JSON.stringify(presentation.data.slides, null, 2))
	}
}

export default GoogleAPI
