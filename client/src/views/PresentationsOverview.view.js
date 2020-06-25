import React, {useEffect} from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PresentationCard from '../components/PresentationCard'
import api from '../api/index'

const PresentationsOverviewView = () => {

    const getAllPresentations = async () => {
        const resp = await api.get('/presentation/all')
        if (resp.status !== 200) {
            console.log(resp.data)
        }
        console.log(resp.data)
    }

    useEffect(() => {
        getAllPresentations()
    })

    return (
        <Row>
            <Col xs={12}>
                <PresentationCard />
                <PresentationCard />
                <PresentationCard />
            </Col>
        </Row>
    )
}

export default PresentationsOverviewView