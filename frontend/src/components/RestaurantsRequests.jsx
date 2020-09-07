import React, { useState } from 'react'
import MaterialTable from 'material-table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useQuery } from 'react-apollo'
import { GET_RESTAURANTS_REQUESTS, RESPINGE_RESTAURANT } from '../queries/queries'
import { useMutation } from 'react-apollo'
import { CONFIRM_RESTAURANT } from '../queries/queries'
import RestaurantPlan from './RestaurantPlan'

const RestaurantsRequests = () => {
    const { loading, error, data, refetch } = useQuery(GET_RESTAURANTS_REQUESTS)
    const [confirmRestaurant] = useMutation(CONFIRM_RESTAURANT)
    const [respingeRestaurant] = useMutation(RESPINGE_RESTAURANT)

    const [confirmModal, setConfirmModal] = useState(false)
    const [cancelModal, setCancelModal] = useState(false)
    const [planModal, setPlanModal] = useState(false)
    const [selectedRowData, setSelectedRowData] = useState()
    const acceptaCerere = async () => {
        await confirmRestaurant({
            variables: {
                ...selectedRowData, mese: (selectedRowData.mese || []).map(m => ({ id: m.id, selected: m.selected, numar_locuri: m.numar_locuri }))
            }
        })
        refetch()
        setConfirmModal(false)
    }

    const respingeCerere = async () => {
        setCancelModal(false)
        await respingeRestaurant({
            variables: { id: selectedRowData.id }
        })
        refetch()
    }

    return (
        <div>
            <MaterialTable
                title="Cereri"
                columns={[
                    { title: 'Id', field: 'id', hidden: true },
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
                        tooltip: 'Accepta cerere',
                        onClick: (event, rowData) => {
                            setSelectedRowData(rowData)
                            setConfirmModal(true)
                        }
                    },
                    {
                        icon: 'cancel',
                        tooltip: 'Respinge cerere',
                        onClick: (event, rowData) => {
                            setSelectedRowData(rowData)
                            setCancelModal(true)
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
            {console.log(selectedRowData)}
            <Modal
                show={confirmModal}
                onHide={() => { setConfirmModal(false) }}
                key='confirm-modal'
            >
                <Modal.Body>
                    <h5 className='text-center mt-3'>Sunteti siguri ca vreti sa confirmati cererea? </h5>
                </Modal.Body>

                <Modal.Footer>
                    <div className='w-100 d-flex justify-content-end'>
                        <button onClick={() => { setConfirmModal(false) }} className="btn btn-outline-success px-3">Nu</button>
                        <button onClick={() => acceptaCerere()} className="btn btn-success px-3 ml-2">Da</button>
                    </div>
                </Modal.Footer>
            </Modal>
            <Modal
                show={cancelModal}
                onHide={() => { setCancelModal(false) }}
                key='cancel-modal'
            >
                <Modal.Body>
                    <h5 className='text-center mt-3'>Sunteti siguri ca vreti sa respingeti cererea? </h5>
                </Modal.Body>

                <Modal.Footer>
                    <div className='w-100 d-flex justify-content-end'>
                        <button onClick={() => { setCancelModal(false) }} className="btn btn-outline-danger px-3">Nu</button>
                        <button onClick={() => respingeCerere()} className="btn btn-danger px-3 ml-2">Da</button>
                    </div>
                </Modal.Footer>
            </Modal>
            <Modal
                show={planModal}
                onHide={() => { setPlanModal(false) }}
                size='xl'
                key='plan-modal'
            >
                <Modal.Body>
                    <h5 className='text-center mt-3'>Plan Restaurant</h5>
                    <RestaurantPlan tables={selectedRowData?.mese || []} />
                </Modal.Body>

                <Modal.Footer>
                    <div className='w-100 d-flex justify-content-end'>
                        <button onClick={() => { setPlanModal(false) }} className="btn btn-outline-dark px-3">Inchideti</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default RestaurantsRequests