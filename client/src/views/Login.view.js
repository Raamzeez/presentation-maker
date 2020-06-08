import React, { useState } from 'react'
import { Card, Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import isMobile from 'is-mobile'

const LoginView = () => {
	const [state, setState] = useState({
		loginFormEmail: '',
		loginFormPassword: '',
	})

	const onChangeHandler = (e) => setState({ [e.target.id]: e.target.value })

	const cardWidth = isMobile() ? '80%' : '50%'

	return (
		<Row>
			<Col xs={12}>
				<Card style={{ width: cardWidth, margin: 'auto' }}>
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
							<Button variant='primary' type='submit'>
								Login
							</Button>
							&nbsp; &nbsp;
							<Link to='/register'>
								<Button variant='secondary' type='submit'>
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
