import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/client'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
import CenterForm from '../components/center-form'

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

export default function Admin() {
  const classes = useStyles()
  const [bookings, setBookings] = useState([])

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

      const bookings = await response.json()

      return bookings
    }

    getAllBookings().then((bookings) => {
      if (!bookings.error) {
        setBookings(bookings) 
      }
    })
  }, [])

  return (
    <CenterForm>
      <Paper elevation={2} className={classes.paper}>
        <Typography component='h1' variant='h5' className={classes.formTitle}>
          Booking Details
        </Typography>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Service Type</TableCell>
            <TableCell align="right">Delivery Method</TableCell>
            <TableCell align="right">Date Time</TableCell>
            <TableCell align="right">Message</TableCell>
            <TableCell align="right">Modify</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {bookings.map((booking) => (
            <TableRow key={booking.customer}>
              <TableCell component="th" scope="row">
                {booking.customer}
              </TableCell>
              <TableCell align="right">{booking.serviceType}</TableCell>
              <TableCell align="right">{booking.deliveryMethod}</TableCell>
              <TableCell align="right">{booking.customer}</TableCell>
              <TableCell align="right">{booking.customer}</TableCell>
              <TableCell align="right"><Button
                type='submit'
                width='50%'
                height='50%'
                variant='contained'
                color='primary'
                className={classes.submit}
                style={{ borderRadius: 25 }}
              >
                Edit 
              </Button></TableCell>
              <TableCell align="right"><Button
                type='submit'
                width='50%'
                height='50%'
                variant='contained'
                color='primary'
                className={classes.submit}
                style={{ borderRadius: 25 }}
              >
                Delete 
              </Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
       
          {/* <div key={booking.name}>
            <div>{booking.name}</div>
          </div>
        ))} */}
      </Paper>
    </CenterForm>
  )
}
