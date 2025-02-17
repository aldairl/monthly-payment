import PropTypes from 'prop-types'
import { Box, Button, Card, CardContent, TextField, Typography, useMediaQuery } from "@mui/material"
import { Form, Formik } from "formik"
import { Loading } from '../../../../../../components/Loading'

export const AddUser = ({ handleFormSubmit, initialValues, checkoutSchema, loading, error, beneficiarySelected, goToAddPayment }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)")

  return (
    <Box sx={{ padding: 3 }} >
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
                    variant="filled"
                    type="text"
                    label="Nombres"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 3" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Apellidos"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastname}
                    name="lastname"
                    error={!!touched.lastname && !!errors.lastname}
                    helperText={touched.lastname && errors.lastname}
                    sx={{ gridColumn: "span 3" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Cédula"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.identification}
                    name="identification"
                    error={!!touched.identification && !!errors.identification}
                    helperText={touched.identification && errors.identification}
                    sx={{ gridColumn: "span 6" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Santuario"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.temple}
                    name="temple"
                    error={!!touched.temple && !!errors.temple}
                    helperText={touched.temple && errors.temple}
                    sx={{ gridColumn: "span 3" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Celular"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cellphone}
                    name="cellphone"
                    error={!!touched.cellphone && !!errors.cellphone}
                    helperText={touched.cellphone && errors.cellphone}
                    sx={{ gridColumn: "span 3" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="date"
                    label="Fecha de nacimiento"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.birthday}
                    name="birthday"
                    error={!!touched.birthday && !!errors.birthday}
                    helperText={touched.birthday && errors.birthday}
                    sx={{ gridColumn: "span 6", '& .MuiInputBase-input': { paddingTop: 4 } }}
                  />

                </Box>

                <Box display="flex" justifyContent="center" mt="20px">
                  <Button type="submit" color="info" variant="contained">
                    {loading ? <Loading /> : 'Guardar beneficiario'}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          {
            error &&
            <Typography color='error' variant='h4'> {error} </Typography>
          }

          {
            beneficiarySelected && <Box sx={{ marginTop: 2 }}>
              <Typography color='success' variant='h5' marginBottom={1}> Beneficiario {beneficiarySelected.name} se ha guardado correctamente!</Typography>
              <Button color='info' variant='outlined' onClick={goToAddPayment} >Registrar pago</Button>
            </Box>
          }

        </CardContent>
      </Card>
    </Box >
  )
}

AddUser.propTypes = {
  isNonMobile: PropTypes.bool,
  handleFormSubmit: PropTypes.func,
  goToAddPayment: PropTypes.func,
  initialValues: PropTypes.object,
  checkoutSchema: PropTypes.object,
  beneficiarySelected: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
}