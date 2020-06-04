import React from 'react'
import { Navbar, Nav, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import auth from '../auth/auth'

const Header = () => {
	return (
		<Navbar bg='primary' variant='dark'>
			<Navbar.Brand href='#home'>Presentation Maker</Navbar.Brand>
			<Nav className='mr-auto'>
				{auth.isAuthenticated() && (
					<>
						<Link component={Nav.Link} to='/'>
							Home
						</Link>
						<Link component={Nav.Link} to='/presentations'>
							Presentations
						</Link>
					</>
				)}
			</Nav>
			<Form inline>
				<Link to='/login'>
					<Button variant='outline-light'>Login</Button>
				</Link>
			</Form>
		</Navbar>
	)
}
export default Header
