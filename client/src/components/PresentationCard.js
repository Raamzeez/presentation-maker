import React from 'react'
import {Card, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const PresentationCard  = ({name, link, headerBackgroundColor, headerTextColor}) => {
   
    
    return (
        <Card className="shadow">
            <Card.Header style={{backgroundColor: `var(--${headerBackgroundColor}`}}>
                <div style={{color: headerTextColor}}>{name}</div>
            </Card.Header>
            <Card.Body>
                {link}
            </Card.Body>
        </Card>
    )
}

export default PresentationCard
