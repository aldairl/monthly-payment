import PropTypes from 'prop-types'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"


function createData(name, value) {
    return {
        name, value
    }
}

export const ShowPayment = ({ paymentCreated }) => {

    const rows = [
        createData('Beneficiario', paymentCreated.payer),
        createData('Registrado en caja ', paymentCreated.box),
        createData('Recibido por ', paymentCreated.createdBy),
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