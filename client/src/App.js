import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
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
				<Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
					<Row style={{ height: '15vh' }} noGutters>
						<Col xs={12}>
							<Header />
						</Col>
					</Row>
					<Row style={{ height: '80vh' }} noGutters>
						<Col xs={12}>
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
					<Row style={{ height: '5vh' }} noGutters>
						<Col xs={12}>
							<Footer/>
						</Col>
					</Row>
				</Container>
			</BrowserRouter>
		)
	}
}

export default App
