import PropTypes from 'prop-types'
import { Box, Button, TextField } from "@mui/material"
import { Form, Formik } from "formik"

export const Login = ({ isNonMobile, handleFormSubmit, initialValues, checkoutSchema, }) => {
    return (
        <Box>
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
                                variant="filled"
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
                                variant="filled"
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

                        <Box display="flex" justifyContent="center" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Aceptar
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}

Login.propTypes = {
    isNonMobile: PropTypes.bool,
    handleFormSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    checkoutSchema: PropTypes.object,
}