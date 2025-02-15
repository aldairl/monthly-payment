import PropTypes from 'prop-types'
import { Box, Button, TextField, Card, CardContent, MenuItem } from "@mui/material"
import Divider from '@mui/material/Divider'
import { Form, Formik } from "formik"
import { ConceptList } from './ConceptList'


export const RegisterPayment = ({
    isNonMobile, handleFormSubmit, initialValues, checkoutSchema, handleConceptsSubmit,
    conceptInitialValues, conceptsCheckoutSchema, conceptList, months,
}) => {

    return (
        <Box>
            <Card >
                <CardContent>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={checkoutSchema}
                    >
                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                                    sx={{
                                        "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
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
                                        sx={{ gridColumn: "span 6" }}
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
                                        sx={{ gridColumn: "span 6" }}
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
                                        sx={{ gridColumn: "span 6" }}
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
                                        sx={{ gridColumn: "span 6" }}
                                        select
                                    >

                                        <MenuItem value='income' >
                                            ingresos
                                        </MenuItem>

                                        <MenuItem value='expense'>
                                            Gastos
                                        </MenuItem>
                                    </TextField>
                                </Box>

                                <Box display="flex" justifyContent="center" mt="20px">
                                    <Button type="submit" color="secondary" variant="contained">
                                        Guardar pago
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>

                    <Formik
                        onSubmit={handleConceptsSubmit}
                        initialValues={conceptInitialValues}
                        validationSchema={conceptsCheckoutSchema}
                    >

                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                            <Form onSubmit={handleSubmit} >
                                <Box
                                    marginTop={5}
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                                    sx={{
                                        "& > div": { gridColumn: isNonMobile ? undefined : "span 8" },
                                    }}
                                >
                                    <Divider sx={{ gridColumn: "span 6" }}>Conceptos del pago</Divider>

                                    <ConceptList sx={{ gridColumn: "span 6" }} conceptList={conceptList} months={months} />

                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Concepto"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.concept_id}
                                        name="concept_id"
                                        error={!!touched.concept_id && !!errors.concept_id}
                                        helperText={touched.concept_id && errors.concept_id}
                                        sx={{ gridColumn: "span 2" }}
                                        select
                                    >
                                        {
                                            conceptList.map(({ name, _id }) => (
                                                <MenuItem key={_id} value={_id} >
                                                    {name}
                                                </MenuItem>
                                            ))
                                        }
                                    </TextField>

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
                                        sx={{ gridColumn: "span 2" }}
                                    />

                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Mes"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.month_id}
                                        name="month_id"
                                        error={!!touched.month_id && !!errors.month_id}
                                        helperText={touched.month_id && errors.month_id}
                                        sx={{ gridColumn: "span 2" }}
                                        select
                                    >
                                        {
                                            months.map(({ _id, name }) => (
                                                <MenuItem key={_id} value={_id} >
                                                    {name}
                                                </MenuItem>
                                            ))
                                        }
                                    </TextField>

                                </Box>
                                <Box display="flex" justifyContent="center" mt="20px">
                                    <Button type="submit" color="secondary" variant="contained">
                                        Agregar nuevo concepto
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </Box >
    )
}

RegisterPayment.propTypes = {
    isNonMobile: PropTypes.bool,
    handleFormSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    checkoutSchema: PropTypes.object,
    handleConceptsSubmit: PropTypes.func,
    conceptInitialValues: PropTypes.object,
    conceptsCheckoutSchema: PropTypes.object,
    conceptList: PropTypes.array,
    months: PropTypes.array,
    currentConcepts: PropTypes.array,
}