import React, { useEffect, useState } from 'react'
import { Grid, Button, Typography, makeStyles, Box, Paper } from '@material-ui/core'
import Link from 'next/link'
import { getSession } from 'next-auth/client'
import CenterBox from '../components/center-box'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 20
  },
  text: {
    fontFamily: ['Roboto Mono', 'monospace']
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#03DAC5',
    height: '60px',
    width: '60px'
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

export default function User() {
  const [state, setState] = useState({ firstName: '', lastName: '', email: '', loading: true })
  const classes = useStyles()

  useEffect(() => {
    async function getUser(email) {
      const response = await fetch('/api/user/info', {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Content-Type': 'application/json',
          accept: 'application/json'
        }
      })
      const data = await response.json()
      return data
    }

    getUser().then(({ firstName, lastName, email }) => {
      setState((state) => ({ ...state, loading: false, firstName, lastName, email }))
    })
  }, [])

  return (
    <CenterBox>
      {state.loading ? (
        <div></div>
      ) : (
        <Paper elevation={2} className={classes.paper}>
          <Typography component='h2' variant='h5' className={classes.text}>
            {state.firstName} {state.lastName}
          </Typography>
          <Typography component='h2' variant='subtitle1'>
            {state.email}
          </Typography>
          <Grid container spacing={2} justify='center' alignItems='center'>
            <Grid item>
              <Link href='/info'>
                <Button
                  type='submit'
                  width='50%'
                  height='50%'
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  style={{ borderRadius: 25 }}
                >
                  Edit Info
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href='/my-bookings'>
                <Button
                  width='50%'
                  height='50%'
                  justify='center'
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  style={{ borderRadius: 25 }}
                >
                  View My Bookings
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      )}
    </CenterBox>
  )
}
