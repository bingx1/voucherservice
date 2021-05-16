import React from 'react'
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: 'none'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    width: 'fit-content',
    padding: 10

    //   webkitBoxShadow:
    //     '0 2.8px 2.2px rgba(f, f, f, 0.034), 0 6.7px 5.3px rgba(f, f, f, 0.048), 0 12.5px 10px rgba(f, f, f, 0.06), 0 22.3px 17.9px rgba(f, f, f, 0.072), 0 41.8px 33.4px rgba(f, f, f, 0.086), 0 100px 80px rgba(f, f, f, 0.12)',
    //   mozBoxShadow:
    //     '0 2.8px 2.2px rgba(f, f, f, 0.034), 0 6.7px 5.3px rgba(f, f, f, 0.048), 0 12.5px 10px rgba(f, f, f, 0.06), 0 22.3px 17.9px rgba(f, f, f, 0.072), 0 41.8px 33.4px rgba(f, f, f, 0.086), 0 100px 80px rgba(f, f, f, 0.12)',
    //   boxShadow:
    //     '0 2.8px 2.2px rgba(f, f, f, 0.034), 0 6.7px 5.3px rgba(f, f, f, 0.048), 0 12.5px 10px rgba(f, f, f, 0.06), 0 22.3px 17.9px rgba(f, f, f, 0.072), 0 41.8px 33.4px rgba(f, f, f, 0.086), 0 100px 80px rgba(f, f, f, 0.12)'
    //
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

export default function Booking({ index, hidden, booking, handleStatusChange }) {
  const classes = useStyles()

  const handleMakePending = () => {
    handleStatusChange(booking._id, 'PENDING')
  }

  const handleAccept = () => {
    handleStatusChange(booking._id, 'ACCEPTED')
  }

  const handleCancel = () => {
    handleStatusChange(booking._id, 'CANCELLED')
  }

  return (
    <Grid item container xs={12} justify='center' alignItems='center'>
      <Paper className={hidden ? classes.hidden : classes.paper}>
        <Grid container>
          <Grid item xs={12} sm={4} md={3} container justify='center' alignItems='center'>
            <Typography component='h4' variant='h5'>
              Booking #{index}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={6} container justify='center' alignItems='center'>
            <div>
              <ul>
                <li>Customer: {booking.customer.firstName + ' ' + booking.customer.lastName}</li>
                <li>Service Type: {booking.serviceType.name}</li>
                <li>Date: {booking.dateTime}</li>
                <li>Message: {booking.message ? booking.message : 'N/A'}</li>
                <li>Status: {booking.status}</li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} md={3} container spacing={1} justify='center' alignItems='center'>
            <Button
              style={booking.status === 'PENDING' ? { display: 'none' } : {}}
              onClick={handleMakePending}
            >
              Set as Pending
            </Button>
            <Button
              style={booking.status === 'ACCEPTED' ? { display: 'none' } : {}}
              onClick={handleAccept}
            >
              Accept
            </Button>
            <Button
              style={booking.status === 'CANCELLED' ? { display: 'none' } : {}}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}
