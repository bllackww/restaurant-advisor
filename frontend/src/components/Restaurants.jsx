import React, { useState, useEffect } from 'react'
import { graphql } from "react-apollo"
import { useQuery } from 'react-apollo'
import { GET_RESTAURANTS } from '../queries/queries'
import SearchBox from './SearchBox'
import Container from 'react-bootstrap/Container'

const Restaurants = (props) => {
    const [searchText, setSearchText] = useState('')
    const { loading, error, data, refetch } = useQuery(GET_RESTAURANTS, {
        variables: { search_text: searchText }
    });

    useEffect(() => {
        refetch()
    }, [searchText])

    return (
        <div>
            <Container>
                <SearchBox searchText={searchText} setSearchText={setSearchText} />
                {data?.restaurants?.map(restaurant => (
                    <div className='card mt-3'>
                        <div className='card-header'>{restaurant.nume}</div>
                        <div className='card-body'>
                            <div>{restaurant.judet}</div>
                            <div>{restaurant.oras}</div>
                            <div>{restaurant.adresa}</div>
                        </div>
                    </div>
                ))}
            </Container>
        </div>
    )
}

export default Restaurants