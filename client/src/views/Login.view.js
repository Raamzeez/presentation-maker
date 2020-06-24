import React, { useState } from 'react'
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom'
import isMobile from 'is-mobile'
import qs from 'qs'
import useStore from '../hooks/useStore'
import './Login.view.scss'


const LoginView = () => {
	const location = useLocation()
	const { registrationSuccessful, email, errorName, errorMessage } = qs.parse(location.search, {
		ignoreQueryPrefix: true,
	})
	const { authStore } = useStore()

	const history = useHistory()
	const [state, setState] = useState({
		email: '',
		password: '',
	})

	if (authStore.authenticated){
		return <Redirect to='/' />
	}

	const onChangeHandler = (e) => setState({ ...state, [e.target.id]: e.target.value })

	const onSubmitHandler = async (e) => {
		e.preventDefault()
		const err = await authStore.login(state)
		if (err) {
			const queryStr = qs.stringify(err)
			history.push('/login?' + queryStr)
			return
		}
		history.push('/')
	}

	const elemWidth = isMobile() ? '80%' : '50%'

	return (
		<Row>
			<Col xs={12}>
				{errorName && (
					<Alert
						variant='danger'
						style={{ width: elemWidth, margin: 'auto', marginBottom: '20px' }}
					>
						{errorName} - {errorMessage}
					</Alert>
				)}
			</Col>
			<Col xs={12}>
				{registrationSuccessful && (
					<Alert
						variant='success'
						style={{ width: elemWidth, margin: 'auto', marginBottom: '20px' }}
					>
						Successful Registration - Your registration was successful. Please
						login now using email: {email}
					</Alert>
				)}
			</Col>
			<Col xs={12}>
				<Card style={{ width: elemWidth, margin: 'auto' }}>
					<Card.Header>Login</Card.Header>
					<Card.Body>
						<Form onSubmit={onSubmitHandler}>
							<Form.Group controlId='email'>
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type='email'
									placeholder='Enter email'
									value={state.email}
									onChange={onChangeHandler}
									minLength='2'
									maxLength='200'
									required
									pattern='[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
								/>
							</Form.Group>
							<Form.Group controlId='password'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Password'
									value={state.password}
									onChange={onChangeHandler}
									minLength='6'
									maxLength='128'
									required
								/>
							</Form.Group>
							<Button variant='primary' type='submit'>
								Login
							</Button>
							&nbsp; &nbsp;
							<Link
								to='/register'
								component={Button}
								variant='secondary'
								type='button'
							>
								Register
							</Link>
						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}

export default LoginView
