import React from 'react'
import Container from 'react-bootstrap/Container'
import { useQuery } from 'react-apollo'
import Reviews from './Reviews'

const Restaurant = (props) => {

    return (
        <div>
            <Container>
                <Reviews id={props.match.params.id} />
            </Container>
        </div>
    )
}

export default Restaurant