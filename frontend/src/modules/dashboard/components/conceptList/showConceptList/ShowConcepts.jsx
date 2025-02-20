import PropTypes from 'prop-types'
import { Box, Card, CardContent, Typography, useMediaQuery } from "@mui/material"
import { Loading } from '../../../../../components/Loading'

export const ShowConcepts = ({ loading, conceptList }) => {

    const isNonMobile = useMediaQuery("(min-width:600px)")

    return (
        <Box
            display='grid'
            gap='30px'
            gridTemplateColumns='repeat(3, minmax(0, 1fr))'
            sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
                marginTop: 2,
                gridColumn: "span 3"
            }}
            padding={2}
        >
            {loading && <Loading />}

            {conceptList.map(({ name, description }) => (
                <Card key={name}>
                    <CardContent>
                        <Typography variant='h4' color='success' > {name} </Typography>
                        <Typography variant='caption' color='primary' > {description} </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    )
}

ShowConcepts.propTypes = {
    loading: PropTypes.bool,
    conceptList: PropTypes.array
}