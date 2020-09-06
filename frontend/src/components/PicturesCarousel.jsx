import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

const PicturesCarousel = ({ imagini }) => {
    return (
        <div style={{width: '80%'}} className='mx-auto'>
            <Carousel controls={false}>
                {imagini.map(imagine => (
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            style={{ height: '500px', objectFit: 'cover' }}
                            src={`http://localhost:5000/image/${imagine}`}
                            alt="Nu s-a putut incarca imaginea"
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    )
}

export default PicturesCarousel