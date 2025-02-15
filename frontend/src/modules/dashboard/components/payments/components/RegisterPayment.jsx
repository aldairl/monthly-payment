import PropTypes from 'prop-types'
import { Box, Button, TextField, Card, CardContent } from "@mui/material"
import { Form, Formik } from "formik"

export const RegisterPayment = ({ isNonMobile, handleFormSubmit, initialValues, checkoutSchema, }) => {
    return (
        <Box>
            <Card >
                <CardContent>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={checkoutSchema}
                    >
                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, }) => (
                            <Form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    sx={{
                                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Nombre"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.payer}
                                        name="payer"
                                        error={!!touched.payer && !!errors.payer}
                                        helperText={touched.payer && errors.payer}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="number"
                                        label="Valor"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.amount}
                                        name="amount"
                                        error={!!touched.amount && !!errors.amount}
                                        helperText={touched.amount && errors.amount}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="caja"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.box}
                                        name="box"
                                        error={!!touched.box && !!errors.box}
                                        helperText={touched.box && errors.box}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Tipo de pago"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.type}
                                        name="type"
                                        error={!!touched.type && !!errors.type}
                                        helperText={touched.type && errors.type}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                </Box>

                                <Box display="flex" justifyContent="center" mt="20px">
                                    <Button type="submit" color="secondary" variant="contained">
                                        Guardar pago
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </Box>
    )
}

RegisterPayment.propTypes = {
    isNonMobile: PropTypes.bool,
    handleFormSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    checkoutSchema: PropTypes.object,
}