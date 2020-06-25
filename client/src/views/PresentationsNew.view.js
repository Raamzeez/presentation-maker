import React, {useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import api from '../api/index'
import qs from 'qs'

export default function PresentationsNewView() {

    const history = useHistory()
    const location = useLocation()
    const { error, name, message } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    })

    const [state, setState] = useState({wikiLink: '', name: ''})

    const onChange = e => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        })
    }

    const onSubmitHandler = async e => {
        e.preventDefault()
        console.log(state)
        const resp = await api.post('/presentation', state)
        if (resp.status !== 201) {
            const errorStr = qs.stringify({error: true, ...resp.data.error})
            history.push('/presentations/new?' + errorStr)
            return
        }
        history.push('/presentations')
    }

    return (
        <Row className="justify-content-center">
            <Col style={{height: '1000px'}} xs={6} className="align-items-center">
                 { error && (
					<Alert
						variant='danger'
						style={{ margin: 'auto', marginBottom: '20px' }}
					>
						{name} - {message}
					</Alert>
				)}
                <Card style={{ margin: "auto 15px"}}>
                    <Card.Header>
                        Create New Presentation
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={onSubmitHandler}>
                            <Form.Group controlId="wikiLink">
                                <Form.Label>Wikipedia Page URL:</Form.Label>
                                <Form.Control type="text" value={state.wikiLink} onChange={onChange} placeholder="Insert Link" size="sm" minLength={10} required/>
                            </Form.Group>
                            <br />
                            <Form.Group controlId="name">
                                <Form.Label>Presentation Name:</Form.Label>
                                <Form.Control type="text" value={state.name} onChange={onChange} placeholder="Insert Name" size="sm" minLength={5} required/>
                            </Form.Group>
                            <br />
                            <Button variant="info" type="submit">
                                Create Presentation
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}