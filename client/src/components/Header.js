import React from 'react'
import { Navbar, Nav, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import useStore from '../hooks/useStore'

const Header = observer(() => {
	const { authStore } = useStore()	
	return (
		<Navbar bg='primary' variant='dark'>
			<Navbar.Brand href='#home'>Presentation Maker</Navbar.Brand>
			<Nav className='mr-auto'>
				{authStore.authenticated && (
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
				{authStore.authenticated ? (
					<Link to='/logout'>
						<Button variant='outline-light'>Logout</Button>
					</Link>
				) : (
					<Link to='/login'>
						<Button variant='outline-light'>Login</Button>
					</Link>
				)}
			</Form>
		</Navbar>
	)
})

export default Header
