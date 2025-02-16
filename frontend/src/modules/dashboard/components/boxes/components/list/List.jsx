import PropTypes from 'prop-types'
import { Box, Button, Card, CardActions, CardContent, FormControl, FormHelperText, MenuItem, Select, Typography, useMediaQuery } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export const List = ({ handlerCloseBox, handlerNewBox, handlerNewPayment, boxes, years, handleChangeYearSelected, yearSelected }) => {

  const isNonMobile = useMediaQuery("(min-width:600px)")

  return (
    <Box
      padding={3}
      paddingTop={1}
      display="grid"
      gap="30px"
      gridTemplateColumns="repeat(3, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 8" },
      }}
    >
      <Box sx={{ gridColumn: 'span 3', textAlign: 'end' }} >

        <FormControl>
          <Select
            value={yearSelected}
            onChange={handleChangeYearSelected}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ height: 30, textAlign: 'center' }}
          >
            {
              years.map((year) => (
                <MenuItem key={year} value={year} >
                  {year}
                </MenuItem>
              ))
            }
          </Select>
          <FormHelperText>Filtrar por año</FormHelperText>
        </FormControl>

      </Box>
      {
        boxes.map(({ _id, name, status, description, creation_date, close_date }) => (
          <Card key={_id} sx={{ gridColumn: "span 1", "&:hover": { boxShadow: 10 }, cursor: 'pointer' }}>

            <CardContent onClick={status === 'open' ? handlerNewPayment : null}>

              <Typography color={status === 'open' ? 'success' : 'textDisabled'} gutterBottom sx={{ fontSize: 14, textAlign: 'end' }}>
                {status === 'open' ? 'abierta' : 'cerrada'}
              </Typography>

              <Typography variant="h5" component="div" sx={{ fontSize: 18 }} color={status === 'open' ? 'primary' : 'textDisabled'}>
                {name}
              </Typography>

              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{status === 'open' ? creation_date : close_date}</Typography>

              <Typography variant="body2">
                {description}
              </Typography>

            </CardContent>

            <CardActions>
              {status === 'open' ?
                <Button size="small" color='secondary' onClick={handlerCloseBox} >cerrar</Button>
                :
                <Typography variant='body2' color={'textDisabled'}> Cerrada el {close_date} </Typography>
              }
            </CardActions>

          </Card>
        ))
      }

      <Card
        sx={{
          gridColumn: "span 1", display: "flex", alignItems: "center", justifyContent: "center",
          minHeight: 150, "&:hover": { boxShadow: 6 }, cursor: 'pointer'
        }}
        onClick={handlerNewBox}
      >
        <CardContent>
          <AddIcon color='success' sx={{ fontSize: 40 }} />
        </CardContent>
      </Card>

    </Box>
  )
}

List.propTypes = {
  handlerCloseBox: PropTypes.func,
  handlerNewBox: PropTypes.func,
  handleChangeYearSelected: PropTypes.func,
  handlerNewPayment: PropTypes.func,
  boxes: PropTypes.array,
  years: PropTypes.array,
  yearSelected: PropTypes.number,
}