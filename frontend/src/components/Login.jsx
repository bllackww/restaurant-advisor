import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { withApollo } from 'react-apollo'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import { LOGIN } from '../queries/queries'

const schema = yup.object({
    email: yup.string().required(),
    parola: yup.string().required(),
});


const Login = (props) => {

    const [validationMessage, setValidationMessage] = useState({ success: undefined, message: undefined })

    const history = useHistory()

    return (
        <Container className='mt-5 bg-light p-5'>
            <Formik
                validationSchema={schema}
                onSubmit={async (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
                    try {
                        const { data: { login: email } } = await props.client.query({
                            query: LOGIN,
                            variables: {
                                ...values
                            }
                        })
                        history.push('')
                    } catch (e) {
                        console.log(e)
                        setValidationMessage({ success: false, message: 'Emailul sau parola nu sunt corecte' })
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
                            {validationMessage.message && <div className={`text-${validationMessage.success ? 'success' : 'danger'} mb-3 ml-3`}>
                                {validationMessage.message}
                            </div>}
                            <Button className='ml-3' variant="success" type="submit">
                                Login
                            </Button>
                        </Form>
                    )}
            </Formik>
        </Container>
    )
}

export default withApollo(Login)
