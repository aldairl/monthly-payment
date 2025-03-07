import PropTypes from 'prop-types'
import { Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, MenuItem, Select, Typography, useMediaQuery } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete';
import { Loading } from '../../../../../../components/Loading'
import { numberFormatMiles } from '../../../../../../utils/dateUtils'


export const List = ({
  loading, error, handlerCloseBox, handlerNewBox, handlerNewPayment, boxes, years,
  handleChangeYearSelected, yearSelected, viewBoxPayments, dialogDelete,
  handleDeleteBox, handlerCancelDelete, boxToDelete, handleConfirmBoxDelete, viewBoxBalance
}) => {

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
      <Box sx={{ gridColumn: 'span 3', textAlign: 'end', justifyContent: 'space-between', display: 'flex' }} >
        <Typography color={error ? 'error' : 'success'} >
          {
            loading && <Loading />
          }

          {
            error && error
          }

        </Typography>
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
        boxes.map(({ _id, name, status, description, creation_date, close_date, cashflow }) => (
          <Card
            key={_id}
            sx={{ gridColumn: "span 1", "&:hover": { boxShadow: 10 } }}
          >
            <Box display='flex' justifyContent='space-between' p={1} >
              <Typography sx={{ cursor: 'pointer' }} variant='body1' color='success' onClick={() => viewBoxPayments(_id)} > Ver pagos </Typography>
              <DeleteIcon sx={{ cursor: 'pointer' }} onClick={() => handleDeleteBox(_id, name)} />
            </Box>

            <CardContent 
              onClick={() => viewBoxBalance(_id)}
            >

              <Typography color={status === 'open' ? 'success' : 'textDisabled'} gutterBottom sx={{ fontSize: 14, textAlign: 'end' }}>
                {status === 'open' ? 'abierta' : 'cerrada'}
              </Typography>

              <Box display='flex' justifyContent='space-between'>
                <Typography
                  variant="h5" component="div" sx={{ fontSize: 18, cursor: 'pointer' }} color={status === 'open' ? 'primary' : 'textDisabled'}
                >
                  {name.toUpperCase()}
                </Typography>
                <Typography variant="h5" component="div" sx={{ fontSize: 18 }} color={status === 'open' ? 'primary' : 'textDisabled'} >
                  {numberFormatMiles(cashflow?.total_balance)}
                </Typography>

              </Box>

              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                {status === 'open' ? new Date(creation_date).toISOString().split('T')[0] : new Date(close_date).toISOString().split('T')[0]}
              </Typography>

              <Typography variant="body2">
                {description}
              </Typography>

            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {status === 'open' ?
                <Button size="small" color='secondary' onClick={handlerCloseBox} >cerrar</Button>
                :
                <Typography variant='body2' color={'textDisabled'}> Cerrada el {close_date} </Typography>
              }

              <Button size="small" color='success' onClick={status === 'open' ? () => handlerNewPayment(_id) : null} >agregar nuevo pago</Button>
            </CardActions>

          </Card>
        ))
      }

      {
        boxes.length === 0 && <Typography color='info' > No hay cajas registradas para el año {yearSelected} </Typography>
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

      <Dialog
        open={dialogDelete}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`¿Desea eliminar la caja ${boxToDelete?.name} ?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Una vez eliminada no se podra volver a recuperar.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlerCancelDelete}>Disagree</Button>
          <Button onClick={handleConfirmBoxDelete}>Agree</Button>
        </DialogActions>
      </Dialog>
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
  loading: PropTypes.bool,
  error: PropTypes.string,
  viewBoxPayments: PropTypes.func,
  dialogDelete: PropTypes.bool,
  handlerCancelDelete: PropTypes.func,
  handleDeleteBox: PropTypes.func,
  boxToDelete: PropTypes.object,
  handleConfirmBoxDelete: PropTypes.func,
  viewBoxBalance: PropTypes.func,
}