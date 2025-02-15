import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux"
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material"
import { removeItem } from '../store/paymentSlice';

export const ConceptList = ({ conceptList, months, sx }) => {

    const { concepts } = useSelector((state) => state.payment);
    const dispatch = useDispatch()
    // 

    return (

        concepts.length > 0 ?
            <Table sx={sx}>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Cantidad</TableCell>
                        <TableCell>Mes</TableCell>
                        <TableCell>Acción</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {concepts.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{conceptList.find((n) => n._id === item.concept_id)?.name || "Desconocido"}</TableCell>
                            <TableCell>{item.amount}</TableCell>
                            <TableCell>{months.find((m) => m._id === item.month_id)?.name || "Desconocido"}</TableCell>
                            <TableCell>

                                <Button color="secondary" onClick={() => dispatch(removeItem(index))}>
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            :
            <></>

    )
}

ConceptList.propTypes = {
    conceptList: PropTypes.array,
    months: PropTypes.array,
    sx: PropTypes.object,
}