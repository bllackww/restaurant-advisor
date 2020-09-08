import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import { GET_REVIEWS } from '../queries/queries'
import { useQuery } from 'react-apollo'
import Modal from 'react-bootstrap/Modal'
import ReactStars from 'react-stars'
import { useMutation } from 'react-apollo'
import { ADAUGA_REVIEW } from '../queries/queries'

const Reviews = (props) => {
    const reviews = useQuery(GET_REVIEWS, {
        variables: { restaurant_id: parseInt(props.id, 10) }
    })

    const [addReview, { data }] = useMutation(ADAUGA_REVIEW);
    const [addModal, setAddModal] = useState(false)
    const [stars, setStars] = useState(5)
    const [message, setMessage] = useState('')

    const adaugaReview = async () => {
        await addReview({
            variables: {
                restaurant_id: parseInt(props.id, 10),
                user_id: JSON.parse(localStorage.getItem('user_id') || null),
                stars,
                message,
            }
        })
        setAddModal(false)
        reviews.refetch({
            variables: { restaurant_id: props.id }
        })
    }

    return (
        <>
            <div className='mx-3 reviews w-100' style={{ backgroundColor: '#343a40' }}>
                <div className='d-flex justify-content-between'>
                    <h5 className='mb-0 text-white'>
                        Reviews
                    </h5>
                    <div
                        className='d-flex cursor-pointer py-2 px-4 bg-dark text-white'
                        style={{ border: '1px solid #28a745', borderRadius: '5px' }}
                        onClick={() => setAddModal(true)}
                    >
                        <i className='fa fa-plus fa-lg my-auto text-success'></i>
                        <span className='ml-2 my-auto'>Adauga review</span>
                    </div>
                </div>
                {reviews?.data?.reviews[0].reviews.map(r => (
                    <div style={{ border: '1px solid gray', borderRadius: '5px', backgroundColor: 'lightgray' }} className='my-5 p-3'>
                        <ReactStars
                            count={r.stars}
                            size={24}
                            color2={'#ffd700'}
                            value={r.stars}
                            half={false}
                            edit={false} />
                        <span>{r.message}</span>
                    </div>
                ))}
            </div>
            {addModal && <Modal
                show={addModal}
                onHide={() => { setAddModal(false) }}
                key='confirm-modal'
            >
                <Modal.Body>
                    <ReactStars
                        count={5}
                        onChange={(value) => setStars(value)}
                        size={24}
                        color2={'#ffd700'}
                        half={false}
                        value={stars} />
                    <textarea className='w-100' type='textArea' value={message} onChange={(e) => setMessage(e.currentTarget.value)} rows={10}></textarea>
                </Modal.Body>

                <Modal.Footer>
                    <div className='w-100 d-flex justify-content-end'>
                        <button onClick={() => { setAddModal(false) }} className="btn btn-outline-success px-3">Inchideti</button>
                        <button onClick={() => adaugaReview()} className="btn btn-success px-3 ml-2">Adaugati</button>
                    </div>
                </Modal.Footer>
            </Modal>}
        </>
    )
}

export default Reviews