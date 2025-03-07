import PropTypes from 'prop-types'
import { Box, List, ListItem, Table, TableBody, TableCell, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material'
import { numberFormatMiles } from '../../../../../../utils/dateUtils'
import { Loading } from '../../../../../../components/Loading'

export const BoxBalance = ({ boxBalance, loading, totalExpense, totalIncome, reportPaids, reportIncome }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)")

    return (
        <Box
            display='grid'
            gap='30px'
            gridTemplateColumns='repeat(2, minmax(0, 1fr))'
            sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                marginTop: 2,
                gridColumn: "span 2"
            }}
            padding={2}
        >

            {loading &&
                <Box gridColumn='span 2' textAlign='center' >
                    <Loading />
                </Box>
            }

            <Box display='flex' alignItems='center' flexDirection='column' gridColumn='span 1' >
                <Typography variant='h4' color='success' >Ingresos</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Concepto</TableCell>
                            <TableCell>$ Valor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {boxBalance.incomes?.map(({ _id, totalAmount }, index) => (
                            <TableRow key={index}>
                                <TableCell>{_id}</TableCell>
                                <TableCell>{numberFormatMiles(totalAmount)}</TableCell>
                            </TableRow>
                        ))}

                        <TableRow key='total'>
                            <TableCell sx={{ fontSize: '15px' }} >Total</TableCell>
                            <TableCell sx={{ color: 'greenyellow', fontSize: '18px' }}> {numberFormatMiles(totalIncome)} </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </Box>

            <Box display='flex' alignItems='center' flexDirection='column' gridColumn='span 1' >
                <Typography variant='h4' color='error' >Salidas</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Concepto</TableCell>
                            <TableCell>$ Valor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {boxBalance.expenses?.map(({ _id, totalAmount }, index) => (
                            <TableRow key={index}>
                                <TableCell>{_id}</TableCell>
                                <TableCell >{numberFormatMiles(totalAmount)}</TableCell>
                            </TableRow>
                        ))}

                        <TableRow key='total'>
                            <TableCell>Total</TableCell>
                            <TableCell sx={{ color: 'orangered', fontSize: '18px' }}> {numberFormatMiles(totalExpense)} </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </Box>

            <Box gridColumn='span 2' display='flex' justifyContent='center' alignItems='center' >
                <Typography variant="body1" fontWeight="bold" component='span' sx={{ whiteSpace: 'pre' }}>
                    Balance = {' '}
                </Typography>

                <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '18px', whiteSpace: 'pre' }} component='span' >
                    {numberFormatMiles(totalIncome)} {''}
                </Typography>

                <Typography sx={{ fontSize: '18px', whiteSpace: 'pre' }} component='span' >
                    - {numberFormatMiles(totalExpense)} = {''}
                </Typography>

                <Typography fontSize='18px' color='success' >
                    {numberFormatMiles(totalIncome - totalExpense)}
                </Typography>
            </Box>

            <Box gridColumn='span 2' display='flex' justifyContent='center' alignItems='center' flexDirection='column' >

                <List>
                    {
                        reportIncome.map(({ _id, totalAmount }, index) => (
                            <ListItem key={index}>{_id} | {totalAmount}</ListItem>
                        ))
                    }

                </List>

                <List>
                    {
                        reportPaids.map((item, index) => (
                            <ListItem key={index}>{item}</ListItem>
                        ))
                    }

                </List>

            </Box>
        </Box>
    )
}

BoxBalance.propTypes = {
    boxBalance: PropTypes.object,
    loading: PropTypes.bool,
    totalExpense: PropTypes.number,
    totalIncome: PropTypes.number,
    reportPaids: PropTypes.array,
    reportIncome: PropTypes.array,
}