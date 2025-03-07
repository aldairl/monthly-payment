import PropTypes from 'prop-types'
import { Box, ListItem, Stack, Typography } from '@mui/material'

export const BoxBalance = ({ boxBalance }) => {
    return (
        <Box>
            <Stack sx={{ gridColumn: 'span 5' }} direction="row" spacing={2} >

                {
                    boxBalance?.incomes?.map(({ _id, totalAmount }) => (
                        <ListItem key={_id} sx={{ display: 'flex', flexDirection: 'column' }} >
                            <Typography>
                                {_id}
                            </Typography>
                            <Typography>
                                {totalAmount}
                            </Typography>
                        </ListItem>
                    ))
                }
            </Stack>
        </Box>
    )
}

BoxBalance.propTypes = {
    boxBalance: PropTypes.object,
}