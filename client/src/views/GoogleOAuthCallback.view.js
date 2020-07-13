import React, { useEffect, useState } from 'react'
import {Alert, Row, Col} from 'react-bootstrap'
import qs from 'qs'
import { useLocation, Redirect } from 'react-router-dom'
import api from '../api'

const GoogleOAuthCallbackView = () => {
	const [state, setState] = useState({
		checked: false,
		error: false,
		errorName: '',
		errorMessage: '',
	})
	const location = useLocation()
	const queryData = qs.parse(location.search, { ignoreQueryPrefix: true })
	console.log('queryData: ', queryData)

	const oAuthCallback = async () => {
		const resp = await api.post('/user/google-oauth-callback', {
			code: queryData.code,
		})
		console.log('resp: ', resp)
		if (resp.status !== 200) {
			setState({
				checked: true,
				error: true,
				errorName: resp.data.error.name,
				errorMessage: resp.data.error.message,
			})
			return
		}
		setState({...state, checked: true })
	}

	useEffect(() => {
		oAuthCallback()
	}, [])

	console.log(state)

	if(state.checked && !state.error) {
		return 	<Redirect to='/' />
	}

	return (
		<Row>
			<Col>
				{state.error && (
					<Alert variant='danger'>
						{state.errorName} - {state.errorMessage}
				  	</Alert>
				)}
				{!state.checked && (
					// <Alert variant="primary">
					// 	Loading...
					// </Alert>
					<h1 className="text-center">
						Loading...
					</h1>
				)}
			</Col>
		</Row>
	)
}

export default GoogleOAuthCallbackView
