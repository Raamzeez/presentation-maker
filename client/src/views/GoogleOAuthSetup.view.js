import React, { useEffect, useState } from 'react'
import {Row, Col} from 'react-bootstrap'
import api from '../api'
import GoogleOAuthCard from '../components/GoogleOAuthCard'

const GoogleOAuthSetupView = () => {
	const [googleSigninURL, setGoogleSigninURL] = useState(null)

	useEffect(() => {
		;(async () => {
			const resp = await api.get('/user/google-oauth-setup')
			setGoogleSigninURL(resp.data)
		})()
	}, [])

	return (

		<Row className="justify-content-md-center">
			<Col xs={12} md={6}>
				<GoogleOAuthCard googleSigninURL={googleSigninURL}/>
			</Col>
		</Row>
	)
}

export default GoogleOAuthSetupView
