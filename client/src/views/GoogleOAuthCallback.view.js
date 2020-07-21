import React from 'react'
import { Alert, Row, Col } from 'react-bootstrap'
import qs from 'qs'
import { useLocation, Redirect } from 'react-router-dom'
import { createMachine, assign } from 'xstate'
import { useMachine } from '@xstate/react'
import ClipLoader from 'react-spinners/ClipLoader'
import api from '../api'

// Checking Code
// Success
// Failure

// ...?code=5434tj335g

const oAuthCallback = async (code) => {
	const resp = await api.post('/user/google-oauth-callback', {
		code,
	})

	if (resp.status !== 200) {
		// eslint-disable-next-line
		throw {
			errorName: resp.data.error.name,
			errorMessage: resp.data.error.message,
		}
	}

	return resp.data
}

const googleOAuthViewStateMachine = createMachine({
	id: 'GoogleOAuthViewStateMachine',
	initial: 'idle',
	context: {
		code: '',
		error: {},
	},
	states: {
		idle: {
			on: {
				'': [
					{
						target: 'checkingCode',
						cond: (context) => !!context.code,
					},
					{
						target: 'failure',
						actions: assign({
							error: (context, event) => ({
								errorName: 'Invalid Code',
								errorMessage:
									'The code returned back from Google was either missing or invalid.',
							}),
						}),
					},
				],
			},
		},
		checkingCode: {
			invoke: {
				id: 'checkingGoogleCode',
				src: (context, event) => oAuthCallback(context.code),
				onDone: {
					target: 'success',
				},
				onError: {
					target: 'failure',
					actions: assign({ error: (context, event) => event.data }),
				},
			},
		},
		success: {
			after: {
				2000: 'redirect',
			},
		},
		failure: {},
		redirect: {},
	},
})

const GoogleOAuthCallbackView = () => {
	const location = useLocation()
	const queryData = qs.parse(location.search, { ignoreQueryPrefix: true })

	const [current] = useMachine(
		googleOAuthViewStateMachine.withContext({
			code: queryData.code,
		})
	)

	if (current.matches('redirect')) {
		return <Redirect to='/' />
	}

	return (
		<Row className="justify-content-center">
			<Col className="text-center">
				{current.matches('failure') && (
					<Alert variant='danger'>
						{current.context.error.errorName} - {current.context.error.errorMessage}
					</Alert>
				)}
				{current.matches('checkingCode') && (
					<ClipLoader
						size={100}
						color={'#123abc'}
						loading={true}
					/>
				)}
				{current.matches('success') && (
					<h1 className='text-center'>Succesfully connected your Google Account!</h1>
				)}
			</Col>
		</Row>
	)
}

export default GoogleOAuthCallbackView
