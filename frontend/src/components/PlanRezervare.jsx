import React, { useState } from 'react'

const PlanRezevare = ({ bookings, tables, setTables, data_si_ora, durata_ore }) => {
    const reservedTables = tables
        .filter((t, i) => bookings.find(b => {
            const x1 = new Date(b.data_si_ora).getTime()
            const x2 = x1 + b.durata_ore * 60 * 60 * 1000
            const y1 = new Date(data_si_ora).getTime()
            const y2 = y1 + durata_ore * 60 * 60 * 1000
            return x1 <= y2 && y1 <= x2
        }))
        .filter((t, i) => bookings.find(b => b.numere_mese.includes(i)))
        .map((t, i) => t.index)

    return (
        <div className='w-100 border-success d-flex flex-wrap bg-info p-3'>
            {tables.map((table, index) => (
                <div key={`table-${index}`}
                    className={
                        `table ${!table.numar_locuri ? 'empty' : reservedTables.includes(index) ? 'reserved' : table.selected ? 'selected' : 'free'}
                        ${!reservedTables.includes(index) && table.numar_locuri ? 'cursor-pointer' : 'cursor-disabled'} ml-2`
                    }
                    onClick={() => {
                        if (reservedTables.includes(index)) return
                        const newTables = tables.map((t, i) => i === index ? { ...t, selected: !t.selected } : t)
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