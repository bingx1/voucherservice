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
import BookingContainer from '../components/booking-container'
import { StyledTabs, StyledTab } from '../components/styled-tabs'

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
    console.log("New status is " + status)
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

    var payload;

    if (response.status === 201) {
      setBookings((bookings) =>
        bookings.map((booking) => {
          if (booking._id === id) {
            booking.status = status
            console.log(booking);
            console.log(booking.customer)
            console.log(booking.customer.contact)
            payload = JSON.stringify({
              customer: booking.customer._id,
              serviceType: booking.serviceType._id,
              deliveryMethod: booking.deliveryMethod,
              dateTime: booking.dateTime,
              message: booking.message
            })
          }
          return booking
        })
      )
    }
    // Send the email confirmation
    if (status == 'ACCEPTED' && payload){
      await fetch('/api/email',{
        method: 'POST', 
        headers: {'Content-Type': 'application/json', 
          accept:'application/json'
          },
          body: payload 
        })
    }
  }

  return (
    <CenterBox>
      <Paper elevation={2} className={classes.paper}>
        <Typography component='h1' variant='h5' className={classes.formTitle}>
          Bookings
        </Typography>
        <StyledTabs value={tabStatus} onChange={handleChange}>
          <StyledTab value='ALL' label='ALL' />
          <StyledTab value='PENDING' label='PENDING' />
          <StyledTab value='ACCEPTED' label='ACCEPTED' />
          <StyledTab value='CANCELLED' label='CANCELLED' />
        </StyledTabs>
        <BookingContainer>
          {bookings.map((booking, index) => (
            <Booking
              key={booking._id}
              index={index + 1}
              hidden={tabStatus !== 'ALL' && booking.status !== tabStatus}
              booking={booking}
              handleStatusChange={handleStatusChange}
            />
          ))}
        </BookingContainer>
      </Paper>
    </CenterBox>
  )
}
