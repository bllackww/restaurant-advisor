import React, { useState } from 'react'
import MaterialTable from 'material-table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useQuery } from 'react-apollo'
import { GET_RESTAURANTS_REQUESTS } from '../queries/queries'

const RestaurantsRequests = () => {
    const { loading, error, data, refetch } = useQuery(GET_RESTAURANTS_REQUESTS);
    
    const [confirmModal, setConfirmModal] = useState(false)
    const [planModal, setPlanModal] = useState(false)
    const [selectedRowData, setSelectedRowData] = useState()
    console.log(data)
    return (
        <div>
            <MaterialTable
                title="Cereri"
                columns={[
                    { title: 'Restaurant', field: 'nume' },
                    { title: 'Judet', field: 'judet' },
                    { title: 'Oras', field: 'oras' },
                    { title: 'Adresa', field: 'adresa' },
                ]}
                data={data?.restaurantsRequests || []}
                options={{
                    filtering: true,
                    actionsColumnIndex: -1,
                    pageSize: 10,
                    exportButton: true
                }}
                actions={[
                    {
                        icon: 'check',
                        tooltip: 'Anuleaza programarea',
                        onClick: (event, rowData) => {
                            setSelectedRowData(rowData)
                            setConfirmModal(true)
                        }
                    },
                    {
                        icon: 'business',
                        tooltip: 'Vezi plan',
                        onClick: (event, rowData) => {
                            setSelectedRowData(rowData)
                            setPlanModal(true)
                        }
                    }
                ]}
            />
            <Modal
                show={confirmModal}
                hide={() => { setConfirmModal(false) }}
            >
                <Modal.Body>
                    <h5 className='text-center mt-3'>Sunteti siguri ca vreti sa confirmati cererea? </h5>
                </Modal.Body>

                <Modal.Footer>
                    <div className='w-100 d-flex justify-content-end'>
                        <button onClick={() => { setConfirmModal(false) }} className="btn btn-outline-success px-3">Nu</button>
                        <button onClick={() => {}} className="btn btn-success px-3 ml-2">Da</button>
                    </div>
                </Modal.Footer>
            </Modal>
            <Modal
                show={planModal}
                hide={() => { setPlanModal(false) }}
            >
                <Modal.Body>
                    <h5 className='text-center mt-3'>Plan</h5>
                </Modal.Body>

                <Modal.Footer>
                    <div className='w-100 d-flex justify-content-end'>
                        <button onClick={() => { setPlanModal(false) }} className="btn btn-outline-dark px-3">Inchide</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default RestaurantsRequests