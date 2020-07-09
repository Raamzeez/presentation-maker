import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PresentationCard from '../components/PresentationCard'
import api from '../api/index'

// A change in the state or props

const colors = [
	{
		headerColor: 'primary',
		textColor: 'white',
	},
	{
		headerColor: 'danger',
		textColor: 'white',
	},
	{
		headerColor: 'success',
		textColor: 'white',
	},
	{
		headerColor: 'info',
		textColor: 'white',
	},
	{
		headerColor: 'warning',
		textColor: 'black',
	},
	{
		headerColor: 'gray',
		textColor: 'white',
	},
	{
		headerColor: 'secondary',
		textColor: 'white',
	},
	{
		headerColor: 'dark',
		textColor: 'white',
	}
]

const PresentationsOverviewView = () => {
	const [presentations, setPresentations] = useState([])
	const [error, setError] = useState(null)
	const getAllPresentations = async () => {
		const resp = await api.get('/presentation/all')
		if (resp.status !== 200) {
			setError(resp.data.error)
		}
		setPresentations(resp.data)
	}

	useEffect(() => {
		// cDM
		getAllPresentations()

		return () => {
			// cWU
		}
	}, [])

	if (error) {
		return (
			<Row>
				<Col xs={12}>
					<Alert variant='danger text-center'>
						Bad Request - {error.message}. Please Try Again
					</Alert>
				</Col>
			</Row>
		)
	}
	return (
		<Row>
			<Col xs={12}>
				<Card style={{ margin: 'auto 15px' }}>
					<Card.Header>Your Presentations</Card.Header>
					<Card.Body>
						<Row>
							{presentations.map((presentation, i) => {
								const colorObj = colors[((i + 1) % colors.length) - 1]
								return (
									<Col xs={4} key={i} style={{ marginTop: 20 }}>
										<PresentationCard
											headerBackgroundColor={colorObj.headerColor}
											headerTextColor={colorObj.textColor}
											name={presentation.name}
											link={presentation.wikiLink}
										/>
									</Col>
								)
							})}
						</Row>
						<br />
						<br />
						<Link to='/presentations/new'>
							<Button type='button'>Create New</Button>
						</Link>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}

export default PresentationsOverviewView
