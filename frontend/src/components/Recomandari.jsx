import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import { useQuery } from 'react-apollo'
import { GET_RECOMANDARI } from '../queries/queries'
import { useHistory } from 'react-router-dom'

const Recomandari = (props) => {
    const history = useHistory()

    const { loading, error, data, refetch } = useQuery(GET_RECOMANDARI, {
        variables: { recent_restaurants: JSON.parse(localStorage.getItem('recent_restaurants') || []) }
    })

    return (
        <div className='d-flex flex-column justify-content-around py-3 bg-dark text-white' style={{ height: '900px' }}>
            <div className='mx-auto'>
                <h4 className='text-center'>Recomandarile</h4>
                <h4 className='text-center'>noastre</h4>
            </div>
            {data?.recomandari.map(restaurant => (
                <div className='cursor-pointer' onClick={() => {
                    const recent_restaurants = JSON.parse(localStorage.getItem('recent_restaurants') || '[]')
                    if (!recent_restaurants.includes(restaurant.id)) recent_restaurants.unshift(restaurant.id)
                    localStorage.setItem('recent_restaurants', JSON.stringify(recent_restaurants.slice(0, 20)))
                    history.push(`/restaurant/${restaurant.id}`)
                }}
                    key={`recomandare-${restaurant.id}`}
                >
                    <div className='d-flex flex-column'>
                        <div className='mx-auto'>
                            <img className='card-img' src={`http://localhost:5000/image/${restaurant.imagini[0]}`} />
                        </div>
                        <div className='p-3'>
                            <div><strong>Nume:</strong> {restaurant.nume}</div>
                            <div><strong>Judet:</strong> {restaurant.judet}</div>
                            <div><strong>Oras:</strong> {restaurant.oras}</div>
                            <div><strong>Adresa:</strong> {restaurant.adresa}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Recomandari