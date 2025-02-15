import PropTypes from 'prop-types'
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material'
import { Field } from 'formik'

export const FormikSelect = ({ values, handleChange }) => {
    return (
        <FormControl sx={{ gridColumn: "span 2" }} >
            <InputLabel id="select-concepts" > Conceptos del pago </InputLabel>
            <Field>
                {({ field }) => (
                    <Select
                        {...field}
                        component={<Select />}
                        labelId="select-concepts"
                        id="select-concepts"
                        name="concepts"
                        value={values.concept_id}
                        onChange={handleChange}
                        input={<OutlinedInput label="Concepto" />}
                    >

                        <MenuItem value='arriendo'>
                            <Checkbox checked={values.concept_id.includes('arriendo')} />
                            <ListItemText primary='arriendo' />
                            arriendo
                        </MenuItem>

                        <MenuItem value='flores'>
                            <Checkbox checked={values.concept_id.includes('flores')} />
                            <ListItemText primary='flores' />
                            flores
                        </MenuItem>
                    </Select>
                )}
            </Field>
        </FormControl>
    )
}

FormikSelect.propTypes = {
    values: PropTypes.object,
    handleChange: PropTypes.func
}