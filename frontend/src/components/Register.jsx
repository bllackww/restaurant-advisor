import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { useMutation } from 'react-apollo'
import { Formik } from 'formik'
import * as yup from 'yup'
import { ADAUGA_USER } from '../queries/queries'
import { judete } from '../utils/utils'

const schema = yup.object({
    nume: yup.string().required(),
    prenume: yup.string().required(),
    judet: yup.string().required(),
    oras: yup.string().required(),
    adresa: yup.string().required(),
    data_nasterii: yup.date().required(),
    email: yup.string().required(),
    parola: yup.string().required(),
});


const Register = () => {

    const [addUser, { data }] = useMutation(ADAUGA_USER);

    const [validationMessage, setValidationMessage] = useState({ success: undefined, message: undefined })

    return (
        <Container className='mt-5 bg-light p-5'>
            <Formik
                validationSchema={schema}
                onSubmit={async (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
                    try {
                        setSubmitting(true)
                        const { data } = await addUser({
                            variables: {
                                ...values
                            }
                        })
                        Object.keys(values).forEach(key => (values[key] = ""))
                        setStatus({ success: true })
                        setValidationMessage({ success: true, message: 'Ati fost inregistrat cu success' })
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
                                <Form.Group as={Col} controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isValid={touched.email && !errors.email}
                                        isInvalid={!!errors.email}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="parola">
                                    <Form.Label>Parola</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="parola"
                                        value={values.parola}
                                        onChange={handleChange}
                                        isValid={touched.parola && !errors.parola}
                                        isInvalid={!!errors.parola}
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
                                <Form.Group as={Col} controlId="nume">
                                    <Form.Label>Nume</Form.Label>
                                    <Form.Control
                                        name="nume"
                                        value={values.nume}
                                        onChange={handleChange}
                                        isValid={touched.nume && !errors.nume}
                                        isInvalid={!!errors.nume}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="prenume">
                                    <Form.Label>Prenume</Form.Label>
                                    <Form.Control
                                        name="prenume"
                                        value={values.prenume}
                                        onChange={handleChange}
                                        isValid={touched.prenume && !errors.prenume}
                                        isInvalid={!!errors.prenume}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="data_nasterii">
                                    <Form.Label>Data Nasterii</Form.Label>
                                    <Form.Control
                                        type='date'
                                        name="data_nasterii"
                                        value={values.data_nasterii}
                                        onChange={handleChange}
                                        isValid={touched.data_nasterii && !errors.data_nasterii}
                                        isInvalid={!!errors.data_nasterii}
                                    />
                                </Form.Group>
                            </Form.Row>

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
                            {validationMessage.message && <div className={`text-${validationMessage.success ? 'success' : 'danger'} mb-3`}>
                                {validationMessage.message}
                            </div>}
                            <Button variant="success" type="submit">
                                Register
                            </Button>
                        </Form>
                    )}
            </Formik>
        </Container>
    )
}

export default Register
