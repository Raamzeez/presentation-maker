import React from 'react'
import { Navbar } from 'react-bootstrap'

const Footer = () => {
	return (
		<Navbar bg='dark' variant='dark'>
			<div style={{ textAlign: 'center', width: '100%', color: 'white' }}>
				<span style={{ fontSize: '12px' }}>© 2020 Presentation Maker</span>
			</div>
		</Navbar>
	)
}
export default Footer
