import React from 'react'
import {Card} from 'react-bootstrap'


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
