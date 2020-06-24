import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'

export default function PresentationsNewView() {

    return (
        <Row>
            <Col xs={12}>
                <Card style={{ margin: "auto 15px"}}>
                    <Card.Header>
                        Create New Presentation
                    </Card.Header>
                    <Card.Body>
                        Something...
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}
