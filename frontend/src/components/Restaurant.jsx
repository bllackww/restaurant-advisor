import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import { useQuery } from 'react-apollo'
import Reviews from './Reviews'
import PicturesCarousel from './PicturesCarousel'
import { GET_RESTAURANT } from '../queries/queries'
import BookingModal from './BookingModal'

const Restaurant = (props) => {
    const { loading, error, data, refetch } = useQuery(GET_RESTAURANT, {
        variables: { restaurant_id: parseInt(props.match.params.id, 10) }
    })

    const [bookingModal, setBookingModal] = useState(false)
    return (
        <div>
            <PicturesCarousel imagini={data?.restaurant[0]?.imagini || []}/>
            <div className='position-absolute p-3 d-flex flex-column justify-content-between'
                style={{ top: '70px', left: '70%', width: '300px', height: '300px', backgroundColor: 'lightgray', borderRadius: '5px' }}>
                <div>
                    <div>{data?.restaurant[0].nume}</div>
                <div>{data?.restaurant[0].adresa}</div>
                </div>
                <button className='btn btn-info' onClick={() => { setBookingModal(true) }}>Rezervare</button>
            </div>
            <Container>
                <Reviews id={props.match.params.id} />
            </Container>
            {bookingModal && <BookingModal data={data.restaurant[0]} onClose={() => { setBookingModal(false) }} refetch={() => refetch()}/>}
        </div>
    )
}

export default Restaurant