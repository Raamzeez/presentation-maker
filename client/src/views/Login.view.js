import React, { useState } from 'react'
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import isMobile from 'is-mobile'
import qs from 'qs'

const LoginView = () => {
	const location = useLocation()
	const { registrationSuccessful, email } = qs.parse(location.search, {
		ignoreQueryPrefix: true,
	})
	const [state, setState] = useState({
		loginFormEmail: '',
		loginFormPassword: '',
	})

	const onChangeHandler = (e) => setState({ [e.target.id]: e.target.value })

	const elemWidth = isMobile() ? '80%' : '50%'

	return (
		<Row>
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
						<Form>
							<Form.Group controlId='loginFormEmail'>
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type='email'
									placeholder='Enter email'
									value={state.loginFormEmail}
									onChange={onChangeHandler}
								/>
							</Form.Group>
							<Form.Group controlId='loginFormPassword'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Password'
									value={state.loginFormPassword}
									onChange={onChangeHandler}
								/>
							</Form.Group>
							<Button variant='primary' type='button'>
								Login
							</Button>
							&nbsp; &nbsp;
							<Link to='/register'>
								<Button variant='secondary' type='button'>
									Register
								</Button>
							</Link>
						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}

export default LoginView
