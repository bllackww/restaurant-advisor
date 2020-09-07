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

const Restaurants = (props) => {
    const history = useHistory()
    const [searchText, setSearchText] = useState('')
    const [judet, setJudet] = useState('')
    const { loading, error, data, refetch } = useQuery(GET_RESTAURANTS, {
        variables: { search_text: searchText, judet }
    })
    console.log(data)
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
        console.log(files)
        await fetch(`http://localhost:5000/upload-images/${id}`, {
            method: 'POST',
            body: filesFormData,
        })
        setTimeout(() => setUploading(false), 500)
    }

    return (
        <div>
            <Container>
                <SearchBox searchText={searchText} setSearchText={setSearchText} />
                <DropdownButton bsPrefix="btn btn-info" id="dropdown-basic-button" title={judet || 'Toate Judetele'}>
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
                        <div className='card mt-3'>
                            <div className='d-flex justify-content-between card-header'>
                                <div className='my-auto'>{restaurant.nume}</div>
                                <div className='d-flex'>
                                    {props.owner && <div>
                                        <input id='files' name='files' type='file' className='mb-2' style={{ display: 'none' }} onChange={(e) => incarcareImagini(e, restaurant.id)} multiple />
                                        <label htmlFor="files" className="btn btn-outline-info">Incarcati imagini</label>
                                        {uploading && <Spinner animation="border" variant="info" />}
                                    </div>}
                                    <div className='ml-2'>
                                        <button onClick={() => history.push(`/restaurant/${restaurant.id}`)} className='btn btn-outline-info'>Detalii</button>
                                    </div>
                                </div>
                            </div>
                            <div className='card-body'>
                                <div className='d-flex'>
                                    <div>
                                        <img className='card-img' src={`http://localhost:5000/image/${restaurant.imagini[0]}`} />
                                    </div>
                                    <div className='p-3'>
                                        <div><strong>Judet:</strong> {restaurant.judet}</div>
                                        <div><strong>Oras:</strong> {restaurant.oras}</div>
                                        <div><strong>Adresa:</strong> {restaurant.adresa}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Container>
        </div>
    )
}

export default Restaurants