import PropTypes from 'prop-types'
import { Box, Button, Card, CardContent, Divider, Typography, useMediaQuery } from "@mui/material"
import { SearchField } from "../../../../../../components/SearchField"
import { Loading } from '../../../../../../components/Loading'

export const GetUser = ({ onSearch, beneficiaries, identification, loading, error, gotToAddNew, selectBeneficiary }) => {

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

            {loading && <Loading />}

            {error && <Typography color='error' >{error}</Typography>}

            {
                beneficiaries.length > 0 &&
                beneficiaries.map(({ name, identification }) => (
                    <>
                        <Divider sx={{ gridColumn: "span 3" }}>Beneficiario encontrado</Divider>
                        <Card key={identification} >
                            <CardContent onClick={() => selectBeneficiary(identification)}>
                                {name}
                                {identification}
                            </CardContent>
                        </Card>
                    </>
                ))

            }

            {!loading && !error && !beneficiaries.length && identification &&
                <Box gridColumn='span 3' >
                    <Typography variant='h4' color='info' >
                        No se ha encontrado un usuario relacionado con la identificación {identification}
                    </Typography>

                    <Typography variant='h5' marginTop={5} marginBottom={2} color='textSecondary' >¿Agregar nuevo beneficiario?</Typography>
                    <Button variant='outlined' onClick={gotToAddNew} >Agregar</Button>
                </Box>
            }
        </Box>
    )
}

GetUser.propTypes = {
    onSearch: PropTypes.func,
    gotToAddNew: PropTypes.func,
    selectBeneficiary: PropTypes.func,
    beneficiaries: PropTypes.array,
    identification: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool,
}