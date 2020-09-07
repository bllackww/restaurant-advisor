import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Formik } from 'formik'
import * as yup from 'yup'
import PlanRezervare from './PlanRezervare'

const schema = yup.object({
    data_si_ora: yup.string().required(),
    durata: yup.number().required().min(1, 'Puteti face o rezervare cu o durata de la 1 la 9 ore').max(9, 'Puteti face o rezervare cu o durata de la 1 la 9 ore'),
});

const BookingModal = (props) => {

    const [validationMessage, setValidationMessage] = useState({ success: undefined, message: undefined })
    const [tables, setTables] = useState(props.data.mese || [])

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
                                            name="durata"
                                            max={9}
                                            min={1}
                                            maxLength={1}
                                            value={values.durata}
                                            onChange={handleChange}
                                            isValid={touched.durata && !errors.durata && values.durata >= 1 && values.durata <= 9}
                                            isInvalid={!!errors.durata}
                                        >
                                        </Form.Control>
                                        {errors.durata && touched.durata ? (
                                            <div>{errors.durata}</div>
                                        ) : null}
                                    </Form.Group>
                                </Form.Row>
                                {validationMessage.message && <div className={`text-${validationMessage.success ? 'success' : 'danger'} mb-3`}>
                                    {validationMessage.message}
                                </div>}
                                <PlanRezervare tables={tables}  setTables={setTables} data_si_ora={values.data_si_ora} durata={values.durata}/>
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
