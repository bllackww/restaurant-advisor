import React, { useState } from 'react'

const PlanRezevare = ({ tables, setTables }) => {
    return (
        <div className='w-100 border-success d-flex flex-wrap bg-info p-3'>
            {tables.map((table, index) => (
                <div key={`table-${index}`}
                    className={`table ${table.reserved ? 'reserved' : 'free'} ${reserved ? 'cursor-pointer' : 'cursor-disabled'} ml-2`}
                    onClick={() => {
                        if (!table.reserved) return
                        const newTables = tables.map((t, i) => i === index ? { ...t, reserved: !t.reserved } : t)
                        setTables(newTables)
                    }}
                >
                    {table.numar_locuri !== 0 && <span className='text-white'>{table.numar_locuri}</span>}
                </div>
            ))}
        </div>
    )
}

export default PlanRezevare