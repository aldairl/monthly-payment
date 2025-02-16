import PropTypes from 'prop-types'
import { Box, Typography, useMediaQuery } from "@mui/material"
import { SearchField } from "../../../../../../components/SearchField"

export const GetUser = ({ onSearch }) => {

    const isNonMobile = useMediaQuery("(min-width:600px)")

    return (
        <Box
            display='grid'
            gridTemplateColumns='repeat( 3, minmax(0, 1fr))'
            gap='30px'
            sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 8" },
                padding: 2
            }}
        >
            <Typography gridColumn='span 3' variant="h3" >Buscar usuario</Typography>
            <SearchField sx={{ gridColumn: 'span 3' }} onSearch={onSearch} />
        </Box>
    )
}

GetUser.propTypes = {
    onSearch: PropTypes.func,
}