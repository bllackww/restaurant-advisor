import React, { useState } from 'react'

const RestaurantPlan = ({ tables, setTables }) => {
    return (
        <div className='w-100 border-success d-flex flex-wrap bg-dark p-3'>
            {tables.map((table, index) => (
                <div key={`table-${index}`}
                    className={`table ${table.selected ? 'selected' : 'free'} ${setTables ? 'cursor-pointer' : ''} ${!table.selected && !setTables ? 'bg-dark' : ''} ml-2`}
                    onClick={() => {
                        if (!setTables) return
                        const newTables = tables.map((t, i) => i === index ? { ...t, selected: !t.selected } : t)
                        setTables(newTables)
                    }}
                    onChange={(e) => {
                        if (!setTables) return
                        const newTables = tables.map((t, i) => i === index ? { ...t, selected: true, numar_locuri: parseInt(e.target.value) } : t)
                        setTables(newTables)
                    }}
                >
                    {setTables && <input 
                        className='nr-locuri-input'
                        type="number" id="numar_locuri"
                        name="numar_locuri"
                        min="1"
                        max="20"
                        onClick={e => {
                            e.stopPropagation()
                        }}
                    >
                    </input>}
                    {!setTables && table.numar_locuri !== 0 && <span className='text-white'>{table.numar_locuri}</span>}
                </div>
            ))}
        </div>
    )
}

export default RestaurantPlan