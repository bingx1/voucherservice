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
  Paper
} from '@material-ui/core'
import CenterBox from '../components/center-box'
import Booking from '../components/booking'
import { StyledTabs, StyledTab } from '../components/styled-tabs'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import ClearIcon from '@material-ui/icons/Clear'
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

export default function MyBookings() {
  const classes = useStyles()

  const [bookings, setBookings] = useState([])
  const [tabStatus, setTabStatus] = useState('ALL')

  useEffect(() => {
    async function getAllUserBookings() {
      const response = await fetch('/api/booking/allByEmail', {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Content-Type': 'application/json',
          accept: 'application/json'
        }
      })

      const bookings = await response.json()
      return bookings
    }

    getAllUserBookings().then((bookings) => {
      // console.log('Retrieved bookings:', bookings)
      setBookings(bookings)
    })
  }, [])

  const handleChange = (event, newStatus) => {
    setTabStatus(newStatus)
  }

  async function handleStatusChange(id, status) {
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

    if (response.status === 201) {
      var booking = bookings.find((booking) => booking._id === id)

      const payload = {
        id: booking._id,
        customer: booking.customer._id,
        serviceType: booking.serviceType._id,
        deliveryMethod: booking.deliveryMethod,
        dateTime: getBookingDate(booking),
        message: status === 'CANCELLED' ? booking.cancelMessage : booking.message,
        status: status
      }

      const email_response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(payload)
      })

      setBookings((bookings) =>
        bookings.map((booking) => {
          if (booking._id === id) booking.status = status

          return { ...booking, cancelMessage: booking.cancelMessage ? booking.cancelMessage : '' }
        })
      )
    }
  }

  const handleCancelMessageChange = (id, value) => {
    setBookings((bookings) =>
      bookings.map((booking) => {
        if (booking._id === id) return { ...booking, cancelMessage: value }
        return booking
      })
    )
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
          My Bookings
        </Typography>
        <StyledTabs value={tabStatus} onChange={handleChange}>
          <StyledTab value='ALL' label='ALL' index={0} />
          <StyledTab value='PENDING' label='PENDING' index={1} />
          <StyledTab value='ACCEPTED' label='ACCEPTED' index={2} />
          <StyledTab value='CANCELLED' label='CANCELLED' index={3} />
        </StyledTabs>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Service Type</TableCell>
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
                      <TableCell align='left'>{booking.deliveryMethod}</TableCell>
                      <TableCell align='left'>{getBookingDate(booking)}</TableCell>
                      <TableCell align='left'>{booking.message ? booking.message : '-'}</TableCell>
                      <TableCell align='left'>{booking.status}</TableCell>
                      <TableCell align='left'>
                        {booking.status !== 'CANCELLED' && (
                          <Grid
                            container
                            spacing={1}
                            direction='column'
                            justify='center'
                            alignItems='center'
                          >
                            <Grid item>
                              <TextField
                                label='Reason'
                                variant='outlined'
                                value={bookings[idx].cancelMessage}
                                onChange={(e) =>
                                  handleCancelMessageChange(booking._id, e.target.value)
                                }
                                multiline
                              />
                              <Button
                                onClick={() => handleStatusChange(booking._id, 'CANCELLED')}
                                width='50%'
                                height='50%'
                                variant='contained'
                                color='primary'
                                className={classes.submit}
                                startIcon={<ClearIcon />}
                                style={{ borderRadius: 25 }}
                              >
                                Cancel
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

        <Link href='/add-booking'>
          <Button
            justify='center'
            variant='contained'
            color='primary'
            className={classes.submit}
            style={{ borderRadius: 25 }}
          >
            Add Booking
          </Button>
        </Link>
      </Paper>
    </CenterBox>
  )
}
