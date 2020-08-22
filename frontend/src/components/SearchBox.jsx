import React, { useState, useEffect } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

const SearchBox = ({ searchText, setSearchText }) => {

    return (
        <div className='my-3'>
            <div className='position-relative'>
                <FormControl
                    placeholder="Search for restaurants..."
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={searchText}
                    onChange={e => setSearchText(e.currentTarget.value)}
                />
                <i className='fa fa-search fa-lg position-absolute text-secondary p-2' style={{ top: 0, right: 0 }} />
            </div>
        </div>
    )
}

export default SearchBox