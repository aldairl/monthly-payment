import PropTypes from 'prop-types'
import { Box, Button, TextField, Card, CardContent, MenuItem, Typography, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider'
import { FieldArray, Form, Formik } from "formik"
import { Loading } from '../../../../../components/Loading';
import { ShowPayment } from './list/ShowPayment';
import { numberFormatMiles } from '../../../../../utils/dateUtils';


export const RegisterPayment = ({
    handleFormSubmit, initialValues, checkoutSchema, conceptList, months, years,boxes,
    beneficiarySelected, loading, paymentCreated, handleClose, openDialog, handleNewPayment
}) => {
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
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        label="Nombre"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={beneficiarySelected.name}
                                        name="payer"
                                        error={!!touched.payer && !!errors.payer}
                                        helperText={touched.payer && errors.payer}
                                        sx={{ gridColumn: "span 3" }}
                                        disabled
                                    />

                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        label="caja"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={(boxes.find(({ _id }) => _id === values.box)?.name)}
                                        name="box"
                                        error={!!touched.box && !!errors.box}
                                        helperText={touched.box && errors.box}
                                        sx={{ gridColumn: "span 3" }}
                                        disabled
                                    />

                                    <TextField
                                        fullWidth
                                        variant="outlined"
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

                                <Divider sx={{ gridColumn: "span 6", margin: 3 }}>Conceptos del pago</Divider>

                                <FieldArray name="concepts">
                                    {({ remove, push }) => (
                                        <>
                                            {
                                                values.concepts.map((concept, index) => (
                                                    <Box
                                                        key={index}
                                                        display='grid'
                                                        gap='30px'
                                                        gridTemplateColumns="repeat(7, minmax(0, 1fr))"
                                                        alignItems='center'
                                                        sx={{
                                                            "& > div": { gridColumn: isNonMobile ? undefined : "span 7" },
                                                            marginTop: 2,
                                                            gridColumn: "span 7"
                                                        }}

                                                    >
                                                        <TextField
                                                            type="text"
                                                            label="Concepto"
                                                            name={`concepts.${index}.concept_id`}
                                                            onChange={handleChange}
                                                            value={values.concepts[index]?.concept_id || ''}
                                                            select
                                                            sx={{
                                                                gridColumn: "span 2",
                                                                '& .MuiInputBase-input': {
                                                                    padding: 1
                                                                }
                                                            }}
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
                                                            variant="outlined"
                                                            type="text"
                                                            label="Mes"
                                                            onChange={handleChange}
                                                            name={`concepts.${index}.month`}
                                                            value={values.concepts[index]?.month || ''}
                                                            select
                                                            sx={{
                                                                gridColumn: "span 1",
                                                                '& .MuiInputBase-input': {
                                                                    padding: 1,
                                                                }
                                                            }}
                                                        >
                                                            {
                                                                months.map(({ name }, index) => (
                                                                    <MenuItem key={name} value={name} selected={(index === 0)} >
                                                                        {name}
                                                                    </MenuItem>
                                                                ))
                                                            }
                                                        </TextField>
                                                        
                                                        <TextField
                                                            fullWidth
                                                            variant="outlined"
                                                            type="text"
                                                            label="Año"
                                                            onChange={handleChange}
                                                            name={`concepts.${index}.year`}
                                                            value={values.concepts[index]?.year || ''}
                                                            select
                                                            sx={{
                                                                gridColumn: "span 1",
                                                                '& .MuiInputBase-input': {
                                                                    padding: 1,
                                                                }
                                                            }}
                                                        >
                                                            {
                                                                years.map(({name}, index) => (
                                                                    <MenuItem key={index} value={name} selected={(index === 0)} >
                                                                        {name}
                                                                    </MenuItem>
                                                                ))
                                                            }
                                                        </TextField>

                                                        <TextField
                                                            fullWidth
                                                            variant="outlined"
                                                            type="number"
                                                            label="Valor"
                                                            onChange={handleChange}
                                                            name={`concepts.${index}.amount`}
                                                            value={values.concepts[index]?.amount || ''}
                                                            sx={{
                                                                gridColumn: "span 2",
                                                                '& .MuiInputBase-input': {
                                                                    // paddingTop: '10px',
                                                                    height: '8px'
                                                                }
                                                            }}
                                                        />
                                                        
                                                        <Box display="flex" justifyContent="center">

                                                            <Button
                                                                sx={{ gridColumn: "span 1", }}
                                                                color='error'
                                                                onClick={() => remove(index)}
                                                            >
                                                                Eliminar <DeleteIcon />
                                                            </Button>
                                                        </Box>

                                                    </Box>
                                                ))
                                            }

                                            <Box display="flex" justifyContent="center" mt="15px">

                                                <Button
                                                    variant='outlined'
                                                    className="secondary"
                                                    onClick={() => push({ concept_id: conceptList[0]['_id'] || '', amount: 30000, month: months[new Date().getMonth()].name || '', year: years[1].name || '' })}
                                                >
                                                    Agregar concepto
                                                </Button>
                                            </Box>
                                        </>

                                    )}
                                </FieldArray>

                                {
                                    values.concepts.length > 0 &&

                                    <Box display="flex" justifyContent="space-between" mt="20px">

                                        <Typography variant='h3' color='success' > Total pago {numberFormatMiles(values.concepts.reduce((total, current) => total + current.amount, 0))} </Typography>
                                        <Button disabled={loading} type="submit" color="success" variant="contained">
                                            {!loading ? 'Guardar pago' : <Loading color='white' />}
                                        </Button>
                                    </Box>
                                }

                            </Form>
                        )}
                    </Formik>

                    <Dialog
                        open={openDialog}
                        onClose={handleClose}
                        aria-labelledby="draggable-dialog-title"
                    >
                        <DialogTitle id="draggable-dialog-title" variant='h3' color='success' >
                            Pago registrado correctamente
                        </DialogTitle>
                        <DialogContent>
                                <ShowPayment paymentCreated={paymentCreated} />
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose} color='primary' >
                                Aceptar
                            </Button>
                            <Button onClick={handleNewPayment} color='success' >Guardar nuevo pago</Button>
                        </DialogActions>
                    </Dialog>

                </CardContent>
            </Card>

            {
                paymentCreated &&
                <Box marginTop={2} >
                    <ShowPayment paymentCreated={paymentCreated} />
                    <Box sx={{ textAlign: 'right' }} >
                        <Button variant='contained' onClick={handleNewPayment} color='success' >Guardar nuevo pago</Button>
                    </Box>
                </Box>

            }
        </Box >
    )
}

RegisterPayment.propTypes = {
    handleFormSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    checkoutSchema: PropTypes.object,
    beneficiarySelected: PropTypes.object,
    boxes: PropTypes.array,
    conceptList: PropTypes.array,
    months: PropTypes.array,
    years: PropTypes.array,
    loading: PropTypes.bool,
    openDialog: PropTypes.bool,
    paymentCreated: PropTypes.object,
    handleClose: PropTypes.func,
    handleNewPayment: PropTypes.func,
}