import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Formik } from 'formik'
import * as yup from 'yup'
import PlanRezervare from './PlanRezervare'
import { useEffect } from 'react'
import { useMutation } from 'react-apollo'
import { ADAUGA_REZERVARE } from '../queries/queries'

const schema = yup.object({
    data_si_ora: yup.string().required(),
    durata_ore: yup.number().required().min(1, 'Puteti face o rezervare cu o durata de la 1 la 9 ore').max(9, 'Puteti face o rezervare cu o durata de la 1 la 9 ore'),
});

const BookingModal = (props) => {

    const [validationMessage, setValidationMessage] = useState({ success: undefined, message: undefined })
    const [tables, setTables] = useState(props.data.mese?.map((m, i) => ({ ...m, selected: false, index: i })) || [])
    const [bookings, setBookings] = useState(props.data.rezervari || [])
    const [addBooking, { data }] = useMutation(ADAUGA_REZERVARE);

    return (
        <Modal show={true} size='xl' onHide={() => props.onClose()}>
            <Modal.Header closeButton>
                <Modal.Title>Rezervare</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Formik
                    validationSchema={schema}
                    onSubmit={async (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
                        try {
                            setSubmitting(true)
                            const { data } = await addBooking({
                                variables: {
                                    ...values,
                                    restaurant_id: props.data.id,
                                    user_id: JSON.parse(localStorage.getItem('user_id') || null),
                                    numere_mese: tables.filter(t => t.selected).map(t => t.index),
                                }
                            })
                            props.refetch()
                            Object.keys(values).forEach(key => (values[key] = ""))
                            setStatus({ success: true })
                            setValidationMessage({ success: true, message: 'Rezervare dvs. a fost efectuata cu succes' })
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
                                    <Form.Group as={Col} controlId="oras">
                                        <Form.Label>Data si ora</Form.Label>
                                        <Form.Control
                                            type='datetime-local'
                                            name="data_si_ora"
                                            value={values.data_si_ora}
                                            onChange={handleChange}
                                            isValid={touched.data_si_ora && !errors.data_si_ora}
                                            isInvalid={!!errors.data_si_ora}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="ora">
                                        <Form.Label>Numarul de ore pentru care doriti rezervarea</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="durata_ore"
                                            max={9}
                                            min={1}
                                            maxLength={1}
                                            value={values.durata_ore}
                                            onChange={handleChange}
                                            isValid={touched.durata_ore && !errors.durata_ore && values.durata_ore >= 1 && values.durata_ore <= 9}
                                            isInvalid={!!errors.durata_ore}
                                        >
                                        </Form.Control>
                                        {errors.durata_ore && touched.durata_ore ? (
                                            <div>{errors.durata_ore}</div>
                                        ) : null}
                                    </Form.Group>
                                </Form.Row>
                                {validationMessage.message && <div className={`text-${validationMessage.success ? 'success' : 'danger'} mb-3`}>
                                    {validationMessage.message}
                                </div>}
                                {values.data_si_ora && values.durata_ore && <PlanRezervare bookings={bookings} tables={tables} setTables={setTables} data_si_ora={values.data_si_ora} durata_ore={values.durata_ore} />}
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

    )
}

export default BookingModal
