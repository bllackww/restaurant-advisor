import React, { useState } from 'react'

const PlanRezevare = ({ tables, setTables, data_si_ora, durata }) => {
    console.log(data_si_ora, durata)
    return (
        <div className='w-100 border-success d-flex flex-wrap bg-info p-3'>
            {tables.map((table, index) => (
                <div key={`table-${index}`}
                    className={`table ${table.reserved ? 'reserved' : 'free'} ${table.reserved ? 'cursor-pointer' : 'cursor-disabled'} ml-2`}
                    onClick={() => {
                        if (!table.reserved) return
                        const newTables = tables.map((t, i) => i === index ? { ...t, reserved: !t.reserved } : t)
                        setTables(newTables)
                    }}
                >
                    {table.numar_locuri !== 0 && <div>
                        <h2 className='text-white text-center'>{table.numar_locuri}</h2>
                        <h4 className='text-white'>locuri</h4>
                    </div>}
                </div>
            ))}
        </div>
    )
}

export default PlanRezevare