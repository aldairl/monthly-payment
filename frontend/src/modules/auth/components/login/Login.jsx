import PropTypes from 'prop-types'
import { Box, Button, TextField, Card, CardContent, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import { Loading } from '../../../../components/Loading'

export const Login = ({ isNonMobile, handleFormSubmit, initialValues, checkoutSchema, loading, error }) => {
    return (
        <Box textAlign='center' display='flex' justifyContent='center' marginTop={8} >
            <Card sx={{ maxWidth: 360, minWidth: 360 }} >
                <CardContent>
                    <h1>Bienvenido</h1>
                    <h3>Iniciar sesión</h3>
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
                                        variant="outlined"
                                        type="text"
                                        label="Usuario"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.username}
                                        name="username"
                                        error={!!touched.username && !!errors.username}
                                        helperText={touched.username && errors.username}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="password"
                                        label="Contraseña"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.password}
                                        name="password"
                                        error={!!touched.password && !!errors.password}
                                        helperText={touched.password && errors.password}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                </Box>

                                <Box display="flex" justifyContent="center" mt="20px" flexDirection='column'>
                                    <Button type="submit" color="info" variant="contained">
                                        {loading ? <Loading color='primary' /> : 'Aceptar'}
                                    </Button>
                                    { error && <Typography marginTop={2} color='error' > {error} </Typography> }
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </Box>
    )
}

Login.propTypes = {
    isNonMobile: PropTypes.bool,
    handleFormSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    checkoutSchema: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
}