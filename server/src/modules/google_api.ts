import { google, GoogleApis } from 'googleapis'
import { OAuth2Client, TokenInfo} from 'google-auth-library'
import { readFileSync } from 'fs'
import path from 'path'
import axios from 'axios'
import UserAccount from './user'
import mongoose from 'mongoose'

type Unwrap<T> =
	T extends Promise<infer U> ? U :
	T extends (...args: any) => Promise<infer U> ? U :
	T extends (...args: any) => infer U ? U :
	T

const SCOPES = ['https://www.googleapis.com/auth/presentations.readonly']

export interface Credentials {
    refresh_token?: string | null;
    expiry_date?: number | null;
    access_token?: string | null;
    token_type?: string | null;
    id_token?: string | null;
}

class GoogleAPI {
	private OAuthClient: OAuth2Client

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

	async getTokenFromCode(code: string): Promise<[any, Error | null]> {
		try {
			const token = await this.OAuthClient.getToken(code)
			return [token, null]
		} catch(err) {
			return [null, new Error(`could not getToken from OAuthClient: ${err}`)]
		}
	}

	setCredentials(credentials: Credentials) {
		this.OAuthClient.setCredentials(credentials)
	}

	async getPresentation(presentationId: string) {
		const slides = google.slides({ version: 'v1', auth: this.OAuthClient })
		const presentation = await slides.presentations.get({
			presentationId,
		})
		console.log(JSON.stringify(presentation.data.slides, null, 2))
	}

	async healthCheck(): Promise<[TokenInfo | null, Error | null]>{
		console.log(this.OAuthClient.credentials)
		try {
			if(this.OAuthClient.credentials.access_token){
				const t = await this.OAuthClient.getTokenInfo(this.OAuthClient.credentials.access_token)
				return [t, null]
			}
			return [null, new Error("OAuth2Client credentials access token is null!")]
		} catch (err) {
			return [null, err]
		}
	}
}


(async () => {
	const g = new GoogleAPI()
	await g.healthCheck()
})()

export default GoogleAPI
