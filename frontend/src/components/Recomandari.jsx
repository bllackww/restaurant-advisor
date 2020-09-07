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
        <div className='w-100 d-flex justify-content-around py-3' style={{ height: '200px', position: 'fixed', bottom: 0, backgroundColor: 'lightcyan' }}>
            {data?.recomandari.map(restaurant => (
                <div className='cursor-pointer' onClick={() => {
                    const recent_restaurants = JSON.parse(localStorage.getItem('recent_restaurants') || '[]')
                    if (!recent_restaurants.includes(restaurant.id)) recent_restaurants.unshift(restaurant.id)
                    localStorage.setItem('recent_restaurants', JSON.stringify(recent_restaurants.slice(0, 20)))
                    history.push(`/restaurant/${restaurant.id}`)
                }}
                    key={restaurant.id}
                >
                    <div className='d-flex'>
                        <div>
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