import React from 'react'
import { Card, Button, ProgressBar } from 'react-bootstrap'

const GoogleOAuthCard = ({ googleSigninURL }) => {
	return (
		<Card className='shadow' style={{ margin: '20px 50px', height: 300 }}>
			<Card.Header className='text-center'>
				<img
					src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png'
					width={25}
					style={{ marginRight: '15px' }}
				/>
				Sign in With Google
			</Card.Header>
			<Card.Body className='text-center' style={{position: 'relative'}}>
				<br />
				<br />
				<h6>Click the Sign in Button Below to get Started!</h6>
				<br />
				{googleSigninURL && (
					<a href={googleSigninURL}>
						<Button>Sign in To Google</Button>
					</a>
				)}
				<br />
                <br />
                <br />
                <br />
                <div>
                    <ProgressBar>
                        <ProgressBar striped animated variant='danger' now={25} key={1} />
                        <ProgressBar striped animated variant='warning' now={25} key={2} />
                        <ProgressBar striped animated variant='success' now={25} key={3} />
                        <ProgressBar striped animated variant="primary" now={25} key={4} />
                    </ProgressBar>
                </div>
			</Card.Body>
		</Card>
	)
}

export default GoogleOAuthCard
