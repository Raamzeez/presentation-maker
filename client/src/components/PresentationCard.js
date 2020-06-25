import React from 'react'
import {Card, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const PresentationCard  = () => {
    return (
        <Card style={{ margin: "auto 15px"}}>
        <Card.Header>
            Your Presentations
        </Card.Header>
        <Card.Body>
            No Presentations<br/><br/>
            <Link to="/presentations/new">
                <Button type="button">
                    Create New
                </Button>
            </Link>
        </Card.Body>
        </Card>
    )
}

export default PresentationCard
