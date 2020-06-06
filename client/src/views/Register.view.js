import React, { useState } from 'react'
import { Card, Form, Button, Row, Col } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import auth from '../auth/auth'

const RegisterView = () => {
	const history = useHistory()
	const [state, setState] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

    const onChangeHandler = (e) => setState({ ...state, [e.target.id]: e.target.value })
    
    const onSubmitHandler = async e => {
        e.preventDefault()
        const stateCopy = { ...state }
        if(state.password !== state.confirmPassword){
            alert("Passwords do not match!")
            return
        }
        delete stateCopy["confirmPassword"]
		const err = await auth.register(stateCopy)
		if (err) {
			// do something with error object
		} 
		history.push("/")
    }

	return (
		<Row>
			<Col xs={12}>
				<Card style={{ width: '50%', margin: 'auto' }}>
					<Card.Header>Register Account</Card.Header>
					<Card.Body>
						<Form>
							<Form.Group controlId='firstName'>
								<Form.Label>First Name</Form.Label>
								<Form.Control
									type='text'
									placeholder='Enter First Name'
									value={state.firstName}
									onChange={onChangeHandler}
								/>
							</Form.Group>
							<Form.Group controlId='lastName'>
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									type='text'
									placeholder='Enter Last Name'
									value={state.lastName}
									onChange={onChangeHandler}
								/>
							</Form.Group>
							<Form.Group controlId='email'>
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type='email'
									placeholder='Enter email'
									value={state.email}
									onChange={onChangeHandler}
								/>
							</Form.Group>
							<Form.Group controlId='password'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Password'
									value={state.password}
									onChange={onChangeHandler}
								/>
							</Form.Group>
							<Form.Group controlId='confirmPassword'>
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Password again'
									value={state.confirmPassword}
									onChange={onChangeHandler}
								/>
							</Form.Group>
							<Button variant='primary' type='submit' onClick={onSubmitHandler}>
								Register
							</Button>
							&nbsp; &nbsp;
							<Link to='/login'>
								<Button variant='secondary' type='submit'>
									Login
								</Button>
							</Link>
						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}

export default RegisterView
