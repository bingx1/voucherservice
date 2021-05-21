import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/client'
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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core'
import CenterBox from '../components/center-box'
import Booking from '../components/booking'
import BookingContainer from '../components/booking-container'
import { StyledTabs, StyledTab } from '../components/styled-tabs'
import DoneIcon from '@material-ui/icons/Done'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    height: '80vh'
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

export default function AdminBookings() {
  const classes = useStyles()

  const [bookings, setBookings] = useState([])
  const [tabStatus, setTabStatus] = useState('ALL')

  useEffect(() => {
    async function getAllBookings() {
      const response = await fetch('/api/booking/all', {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Content-Type': 'application/json',
          accept: 'application/json'
        }
      })

      var bookings = await response.json()

      return bookings
    }

    getAllBookings().then((bookings) => {
      setBookings(bookings)
    })
  }, [])

  const handleChange = (event, newStatus) => {
    setTabStatus(newStatus)
  }

  async function handleStatusChange(id, status) {
    // console.log('New status is ' + status)
    const response = await fetch('/api/booking/editStatus', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({ id, status })
    })

    var payload

    if (response.status === 201) {
      const date = new Date(booking.dateTime)
      const dateTimeString = getBookingDate(date)

      setBookings((bookings) =>
        bookings.map((booking) => {
          if (booking._id === id) {
            booking.status = status
            payload = {
              id: booking._id,
              customer: booking.customer._id,
              serviceType: booking.serviceType._id,
              deliveryMethod: booking.deliveryMethod,
              dateTime: dateTimeString,
              message: booking.message,
              status
            }
          }
          return booking
        })
      )
    }
    // Send the email confirmation
    if (status == 'ACCEPTED' && payload) {
      await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(payload)
      })
    }
  }

  const appendLeadingZero = (number) => {
    return number <= 9 ? '0' + number : number
  }

  const getBookingDate = (booking) => {
    const date = new Date(booking.dateTime)
    return (
      date.getFullYear() +
      '/' +
      appendLeadingZero(date.getMonth() + 1) +
      '/' +
      appendLeadingZero(date.getDate()) +
      ' ' +
      appendLeadingZero(date.getHours()) +
      ':' +
      appendLeadingZero(date.getMinutes())
    )
  }

  return (
    <CenterBox>
      <Paper elevation={2} className={classes.paper}>
        <Typography component='h1' variant='h5' className={classes.formTitle}>
          Bookings
        </Typography>
        <StyledTabs value={tabStatus} onChange={handleChange}>
          <StyledTab value='ALL' label='ALL' index={0} />
          <StyledTab value='PENDING' label='PENDING' index={1} />
          <StyledTab value='ACCEPTED' label='ACCEPTED' index={2} />
          <StyledTab value='CANCELLED' label='CANCELLED' index={3} />
        </StyledTabs>
        {/* <BookingContainer>
          {bookings.map((booking, index) => (
            <Booking
              key={booking._id}
              index={index + 1}
              hidden={tabStatus !== 'ALL' && booking.status !== tabStatus}
              booking={booking}
              handleStatusChange={handleStatusChange}
            />
          ))}
        </BookingContainer> */}

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Service Type</TableCell>
                <TableCell align='left'>Customer</TableCell>
                <TableCell align='left'>Delivery Method</TableCell>
                <TableCell align='left'>Date Time</TableCell>
                <TableCell align='left'>Message</TableCell>
                <TableCell align='left'>Status</TableCell>
                <TableCell align='center'>Commands</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking, idx) => {
                if (tabStatus === 'ALL' || booking.status === tabStatus) {
                  return (
                    <TableRow key={idx}>
                      <TableCell align='left'>{booking.serviceType.name}</TableCell>
                      <TableCell align='left'>
                        {booking.customer.firstName + ' ' + booking.customer.lastName}
                      </TableCell>
                      <TableCell align='left'>{booking.deliveryMethod}</TableCell>
                      <TableCell align='left'>{getBookingDate(booking)}</TableCell>
                      <TableCell align='left'>{booking.message ? booking.message : '-'}</TableCell>
                      <TableCell align='left'>{booking.status}</TableCell>
                      <TableCell align='left'>
                        {booking.status === 'PENDING' && (
                          <Grid
                            container
                            spacing={1}
                            direction='column'
                            justify='center'
                            alignItems='center'
                          >
                            <Grid item>
                              <Button
                                onClick={() => handleStatusChange(booking._id, 'ACCEPTED')}
                                width='50%'
                                height='50%'
                                variant='contained'
                                color='primary'
                                className={classes.submit}
                                startIcon={<DoneIcon />}
                                style={{ borderRadius: 25 }}
                              >
                                Accept
                              </Button>
                            </Grid>
                          </Grid>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                } else {
                  return
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </CenterBox>
  )
}
