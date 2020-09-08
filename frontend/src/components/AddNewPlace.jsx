import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useMutation } from 'react-apollo'
import Modal from 'react-bootstrap/Modal'
import { Formik } from 'formik'
import * as yup from 'yup'
import { ADAUGA_RESTAURANT } from '../queries/queries'
import { judete } from '../utils/utils'
import RestaurantPlan from './RestaurantPlan'

const schema = yup.object({
    nume: yup.string().required(),
    judet: yup.string().required(),
    oras: yup.string().required(),
    adresa: yup.string().required(),
    specific: yup.string().required(),
});

const AddNewPlace = () => {
    const [addPlaceModal, setAddPlaceModal] = useState(false)
    const [validationMessage, setValidationMessage] = useState({ success: undefined, message: undefined })
    const [addRestaurant, { data }] = useMutation(ADAUGA_RESTAURANT);
    const [tables, setTables] = useState(Array.from(Array(96).keys()).map((el, index) => ({ id: index, selected: false, numar_locuri: 0 })))

    return (
        <>
            <div className='d-flex my-auto mr-2 bg-gray text-white'
                style={{ border: '2px solid #28a745', borderRadius: '5px', cursor: 'pointer', padding: '6px 20px 6px 20px' }}
                onClick={() => setAddPlaceModal(true)}
            >
                <i className='fa fa-plus fa-lg my-auto text-success' />
                <span className='my-0 ml-2'>Adauga restaurant</span>
            </div>
            {addPlaceModal &&
                <Modal show={true} size='xl' onHide={() => setAddPlaceModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Adauga Restaurant</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Formik
                            validationSchema={schema}
                            onSubmit={async (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
                                try {
                                    setSubmitting(true)
                                    const { data } = await addRestaurant({
                                        variables: {
                                            ...values,
                                            mese: tables,
                                        }
                                    })
                                    Object.keys(values).forEach(key => (values[key] = ""))
                                    setStatus({ success: true })
                                    setValidationMessage({ success: true, message: 'Cererea dvs. a fost trimisa' })
                                } catch (e) {
                                    setStatus({ success: false })
                                    setSubmitting(false)
                                    setErrors({ submit: 'A aparut o eroare, va rugam incercati mai tarziu' })
                                    setValidationMessage({ success: false, message: 'A aparut o eroare, va rugam incercati mai tarziu' })
                                }
                            }}
                            initialValues={{
                            }}
                            validateOnBlur={false}
                            validateOnChange={false}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                isValid,
                                errors,
                            }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="nume">
                                                <Form.Label>Nume Restaurant</Form.Label>
                                                <Form.Control
                                                    name="nume"
                                                    value={values.nume}
                                                    onChange={handleChange}
                                                    isValid={touched.nume && !errors.nume}
                                                    isInvalid={!!errors.nume}
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Group controlId="adresa">
                                            <Form.Label>Adresa</Form.Label>
                                            <Form.Control
                                                name="adresa"
                                                value={values.adresa}
                                                onChange={handleChange}
                                                isValid={touched.adresa && !errors.adresa}
                                                isInvalid={!!errors.adresa}
                                            />
                                        </Form.Group>


                                        <Form.Row>
                                            <Form.Group as={Col} controlId="oras">
                                                <Form.Label>Oras</Form.Label>
                                                <Form.Control
                                                    name="oras"
                                                    value={values.oras}
                                                    onChange={handleChange}
                                                    isValid={touched.oras && !errors.oras}
                                                    isInvalid={!!errors.oras}
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="judet">
                                                <Form.Label>Judet</Form.Label>
                                                <Form.Control as="select" defaultValue="Alegeti..."
                                                    name="judet"
                                                    value={values.judet}
                                                    onChange={handleChange}
                                                    isValid={touched.judet && !errors.judet}
                                                    isInvalid={!!errors.judet}
                                                >
                                                    <option>Choose...</option>
                                                    {judete.map(judet => (
                                                        <option>{judet}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="specific">
                                                <Form.Label>Specific</Form.Label>
                                                <Form.Control
                                                    name="specific"
                                                    value={values.specific}
                                                    onChange={handleChange}
                                                    isValid={touched.specific && !errors.specific}
                                                    isInvalid={!!errors.specific}
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        <RestaurantPlan tables={tables} setTables={setTables}/>
                                        {validationMessage.message && <div className={`text-${validationMessage.success ? 'success' : 'danger'} mb-3`}>
                                            {validationMessage.message}
                                        </div>}
                                        <div className='d-flex justify-content-end mt-2'>
                                            <Button variant="success" type="submit">
                                                Trimite Cererea
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                        </Formik>
                    </Modal.Body>
                </Modal>
            }
        </>
    )
}

export default AddNewPlace