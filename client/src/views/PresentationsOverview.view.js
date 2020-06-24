import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PresentationsOverviewView = () => {

    return (
        <Row>
            <Col xs={12}>
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
            </Col>
        </Row>
    )
}

export default PresentationsOverviewView