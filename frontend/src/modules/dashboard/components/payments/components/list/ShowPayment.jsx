import PropTypes from 'prop-types'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useSelector } from 'react-redux'


function createData(name, value) {
    return {
        name, value
    }
}

export const ShowPayment = ({ paymentCreated }) => {
    const { beneficiarySelected } = useSelector(state => state.beneficiary)
    const { boxes } = useSelector(state => state.box)
    const { username } = useSelector(state => state.auth)

    const rows = [
        createData('Beneficiario', beneficiarySelected.name),
        createData('Registrado en caja ', (boxes.find(({ _id }) => _id === paymentCreated.box)?.name)),
        createData('Recibido por ', username),
        createData('Valor del pago', paymentCreated.amount),
        createData('Recibo n°', paymentCreated.receipt),
        createData('Fecha de recibido', paymentCreated.creation_date),
    ]


    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2} >
                            <Typography variant="h4" color="primary" >
                                Detalle del pago
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell >{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

ShowPayment.propTypes = {
    paymentCreated: PropTypes.object,
}