import React, { useState, useEffect } from 'react'
import { graphql } from "react-apollo"
import { useQuery } from 'react-apollo'
import { GET_RESTAURANTS } from '../queries/queries'
import SearchBox from './SearchBox'
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { judete } from '../utils/utils'
import { useHistory } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import Recomandari from './Recomandari'

const Restaurants = (props) => {
    const history = useHistory()
    const [searchText, setSearchText] = useState('')
    const [judet, setJudet] = useState('')
    const { loading, error, data, refetch } = useQuery(GET_RESTAURANTS, {
        variables: { search_text: searchText, judet, user_id: props.owner ? JSON.parse(localStorage.getItem('user_id') || null) || undefined : undefined }
    })
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        refetch()
    }, [searchText, judet])

    const incarcareImagini = async (e, id) => {
        setUploading(true)
        let files = e.target.files;
        const filesFormData = new FormData()
        for (let i = 0; i < files.length; i++) {
            filesFormData.append(`files`, files[i])
        }
        await fetch(`http://localhost:5000/upload-images/${id}`, {
            method: 'POST',
            body: filesFormData,
        })
        setTimeout(() => setUploading(false), 500)
    }

    return (
        <div className='d-flex'>
            <Recomandari />
            <div className='mx-3 flex-grow-1'>
                <SearchBox searchText={searchText} setSearchText={setSearchText} />
                <DropdownButton bsPrefix="btn btn-dark" id="dropdown-basic-button" title={judet || 'Toate Judetele'}>
                    {['Toate Judetele', ...judete].map(judet => {
                        return (
                            <Dropdown.Item
                                onClick={(e) => {
                                    if (judet !== 'Toate Judetele') setJudet(judet)
                                    else setJudet('')
                                }}
                                style={{ textTransform: "capitalize" }}
                                href="#/action-1">
                                {judet}
                            </Dropdown.Item>
                        )
                    })}
                </DropdownButton>
                {data?.restaurants?.map(restaurant => {
                    return (
                        <div className='card mt-3' key={`restaurant-${restaurant.id}`}>
                            <div className='d-flex justify-content-between card-header'>
                                <div className='my-auto'>{restaurant.nume}</div>
                                <div className='d-flex'>
                                    {props.owner && <div>
                                        {console.log(restaurant.id)}
                                        <input id={`files-${restaurant.id}`} name='files' type='file' className='mb-2' style={{ display: 'none' }} onChange={(e) => {
                                            console.log(restaurant)
                                            incarcareImagini(e, restaurant.id)
                                        }} multiple />
                                        <label htmlFor={`files-${restaurant.id}`} className="btn btn-dark">Incarcati imagini</label>
                                        {uploading && <Spinner animation="border" variant="info" />}
                                    </div>}
                                    <div className='ml-2'>
                                        <button onClick={() => {
                                            const recent_restaurants = JSON.parse(localStorage.getItem('recent_restaurants') || '[]')
                                            if (!recent_restaurants.includes(restaurant.id)) recent_restaurants.unshift(restaurant.id)
                                            localStorage.setItem('recent_restaurants', JSON.stringify(recent_restaurants.slice(0, 20)))
                                            history.push(`/restaurant/${restaurant.id}`)
                                        }} className='btn btn-dark'>Detalii</button>
                                    </div>
                                </div>
                            </div>
                            <div className='card-body'>
                                <div className='d-flex'>
                                    <div>
                                        <img className='card-img' src={`http://localhost:5000/image/${restaurant.imagini[0]}`} />
                                    </div>
                                    <div className='p-3 my-auto'>
                                        <div><strong>Judet:</strong> {restaurant.judet}</div>
                                        <div><strong>Oras:</strong> {restaurant.oras}</div>
                                        <div><strong>Adresa:</strong> {restaurant.adresa}</div>
                                        <div><strong>Specific:</strong> {restaurant.specific}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Restaurants