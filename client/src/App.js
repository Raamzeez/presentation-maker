import React from 'react'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import LoginView from './views/Login.view'
import RegisterView from './views/Register.view'
import AuthenticatedView from './views/Autheticated.view'
import { Container, Col, Row } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Container
					fluid={true}
					style={{ paddingLeft: '0px', paddingRight: '0px', height: '100%' }}
				>
					<Row
						style={{
							height: '56px',
						}}
						noGutters={true}
					>
						<Col sm={12} xs={12}>
							<Header />
						</Col>
					</Row>
					<Row
						style={{
							height: 'calc(100% - 96px)',
							marginTop: '20px',
						}}
						noGutters={true}
					>
						<Col sm={12} xs={12}>
							<Route exact path='/'>
								<AuthenticatedView />
							</Route>
							<Route exact path='/login'>
								<LoginView />
							</Route>
							<Route exact path='/register'>
								<RegisterView />
							</Route>
						</Col>
					</Row>
					<Row
						style={{
							height: '40px',
						}}
						noGutters={true}
					>
						<Col sm={12} xs={12}>
							<Footer />
						</Col>
					</Row>
				</Container>
			</BrowserRouter>
		)
	}
}

export default App
