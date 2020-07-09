import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import api from '../api'

const GoogleOAuthSetupView = () => {
	const [googleSigninURL, setGoogleSigninURL] = useState(null)

	useEffect(() => {
		;(async () => {
			const resp = await api.get('/user/google-oauth-setup')
			setGoogleSigninURL(resp.data)
		})()
	}, [])

	return (
		<div>
			Hey.. sign in!
			<br />
			{googleSigninURL && (
				<a href={googleSigninURL}>
					<Button>Sign in To Google</Button>
				</a>
			)}
		</div>
	)
}

export default GoogleOAuthSetupView
