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
            <PicturesCarousel imagini={data?.restaurant[0]?.imagini || []} />
            <div className='d-flex w-100 mt-3 ml-3'>
                <div className='p-3 d-flex flex-column justify-content-between bg-dark text-white'
                    style={{ width: '400px', height: '350px', backgroundColor: 'lightgray', borderRadius: '5px' }}>
                    <div className='d-flex flex-column align-items-center flex-grow-1 p-3 justify-content-around'>
                        <div>Nume: {data?.restaurant[0].nume}</div>
                        <div>Judet: {data?.restaurant[0].judet}</div>
                        <div>Oras: {data?.restaurant[0].oras}</div>
                        <div>Adresa: {data?.restaurant[0].adresa}</div>
                        <div>Specific: {data?.restaurant[0].specific}</div>
                    </div>
                    <button className='btn text-dark mt-2' style={{ backgroundColor: 'lightgray' }} onClick={() => { setBookingModal(true) }}>Rezervare</button>
                </div>
                <Reviews id={props.match.params.id} />
            </div>
            {bookingModal && <BookingModal data={data.restaurant[0]} onClose={() => { setBookingModal(false) }} refetch={() => refetch()} />}
        </div>
    )
}

export default Restaurant