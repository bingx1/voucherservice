import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  makeStyles,
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  FormHelperText,
  IconButton,
  InputAdornment,
  Paper,
  Select,
  InputLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup
} from '@material-ui/core'
import CenterForm from '../components/center-form'
import { signOut } from 'next-auth/client'
import { DateTimePicker } from '@material-ui/pickers'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 20
    //   webkitBoxShadow:
    //     '0 2.8px 2.2px rgba(f, f, f, 0.034), 0 6.7px 5.3px rgba(f, f, f, 0.048), 0 12.5px 10px rgba(f, f, f, 0.06), 0 22.3px 17.9px rgba(f, f, f, 0.072), 0 41.8px 33.4px rgba(f, f, f, 0.086), 0 100px 80px rgba(f, f, f, 0.12)',
    //   mozBoxShadow:
    //     '0 2.8px 2.2px rgba(f, f, f, 0.034), 0 6.7px 5.3px rgba(f, f, f, 0.048), 0 12.5px 10px rgba(f, f, f, 0.06), 0 22.3px 17.9px rgba(f, f, f, 0.072), 0 41.8px 33.4px rgba(f, f, f, 0.086), 0 100px 80px rgba(f, f, f, 0.12)',
    //   boxShadow:
    //     '0 2.8px 2.2px rgba(f, f, f, 0.034), 0 6.7px 5.3px rgba(f, f, f, 0.048), 0 12.5px 10px rgba(f, f, f, 0.06), 0 22.3px 17.9px rgba(f, f, f, 0.072), 0 41.8px 33.4px rgba(f, f, f, 0.086), 0 100px 80px rgba(f, f, f, 0.12)'
    //
  },
  formTitle: {
    fontFamily: ['Roboto Mono', 'monospace']
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#03DAC5',
    height: '60px',
    width: '60px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    fontFamily: 'Roboto'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#6200EE',
    fontFamily: ['Roboto Mono', 'monospace']
  },
  link: {
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))

export default function AddService() {
  const classes = useStyles()
  const [services, setServices] = useState([])
  const [selectedDate, handleDateChange] = useState(new Date())

  const [state, setState] = useState({
    serviceName: '',
    deliveryMethod: 'DELIVERY',
    message: '',
    errorMessage: '',
    age: ''
  })

  const handleChange = (e) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const chosenService = services.find((service) => service.name === state.serviceName)

    if (chosenService) {
      const serviceId = chosenService._id

      const user = await (
        await fetch('/api/user/info', {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        })
      ).json()

      if (user) {
        const payload = JSON.stringify({
          customer: user._id,
          serviceType: serviceId,
          deliveryMethod: state.deliveryMethod,
          dateTime: selectedDate,
          message: state.message
        })
        console.log(payload)
        const response = await fetch('/api/booking/add', {
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-Type': 'application/json',
            accept: 'application/json'
          },
          body: payload
        })

        const email_response = await fetch('/api/email',{
          method: 'POST', 
          headers: {'Content-Type': 'application/json', 
            accept:'application/json'
            },
            body: payload 
          })
        // console.log(email_response)
        if (response.status === 201) {
          setState((state) => ({
            ...state,
            error: false,
            errorMessage: 'Booking successfully added'
          }))
        } else {
          const error = (await response.json()).error
          setState((state) => ({ ...state, error: true, errorMessage: error }))
        }
      } else {
        signOut()
      }
    } else {
      setState((state) => ({ ...state, error: true, errorMessage: 'Service is required' }))
    }
  }

  useEffect(() => {
    async function getAllServices() {
      const response = await fetch('/api/service/all', {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Content-Type': 'application/json',
          accept: 'application/json'
        }
      })

      const services = await response.json()

      return services
    }

    getAllServices().then((services) => {
      if (!services.error) {
        setServices(services)
      }
    })
  }, [])

  return (
    <CenterForm>
      <Paper elevation={2} className={classes.paper}>
        <Typography component='h1' variant='h5' className={classes.formTitle}>
          Add Booking
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl variant='outlined' fullWidth required>
              <InputLabel htmlFor='service-select'>Service</InputLabel>
              <Select
                native
                value={state.serviceName}
                onChange={handleChange}
                label='Service'
                inputProps={{
                  name: 'serviceName',
                  id: 'service-select'
                }}
              >
                <option aria-label='None' value='' />
                {services.map((service) => (
                  <option key={service._id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <DateTimePicker
              fullWidth
              disablePast
              required
              label='Delivery Date'
              inputVariant='outlined'
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>Delivery Method</FormLabel>
              <RadioGroup
                aria-label='delivery method'
                name='deliveryMethod'
                value={state.deliveryMethod}
                onChange={handleChange}
              >
                <FormControlLabel value='DELIVERY' control={<Radio />} label='Delivery' />
                <FormControlLabel value='PICKUP' control={<Radio />} label='Pickup' />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              fullWidth
              id='message'
              label='Message'
              name='message'
              autoFocus
              onChange={handleChange}
              value={state.message}
              multiline
              rows={3}
              rowsMax={3}
            />
          </Grid>
        </Grid>
        <FormHelperText error={state.error}>{state.errorMessage}</FormHelperText>
        <Grid container justify='center'>
          <Button
            width='50%'
            height='50%'
            variant='contained'
            color='primary'
            className={classes.submit}
            style={{ borderRadius: 25 }}
            onClick={handleSubmit}
          >
            Add Booking
          </Button>
        </Grid>
      </Paper>
    </CenterForm>
  )
}
