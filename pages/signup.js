import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CenterForm from '../components/center-form'
import Link from 'next/link'
import { FormHelperText, IconButton, InputAdornment, Paper } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 20
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
    marginTop: theme.spacing(3),
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

async function handleSubmit(e) {
  e.preventDefault()
}

export default function SignUp() {
  const classes = useStyles()

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    password: '',
    error: '',
    showPassword: false
  })

  const handleChange = (e) => {
    let value = e.target.value
    if (e.target.name == 'contact') value = value.replace(/[^0-9]+/g, '')
    setState((state) => ({ ...state, [e.target.name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({
        firstName: state.firstName,
        lastName: state.lastName,
        contact: state.contact,
        email: state.email,
        password: state.password
      })
    })

    if (response.status === 201) {
      localStorage.setItem('vs-email', state.email)
      window.location.href = '/'
    } else {
      const error = (await response.json()).error
      setState((state) => ({ ...state, error: error }))
    }
  }

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  const handleMouseDownPassword = (e) => {
    e.preventDefault()
  }

  return (
    <CenterForm>
      <Paper elevation={2} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon fontSize='large' style={{ color: 'black' }} />
        </Avatar>
        <Typography component='h1' variant='h5' className={classes.formTitle}>
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                onChange={handleChange}
                value={state.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
                onChange={handleChange}
                value={state.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='contact'
                label='Contact Number'
                name='contact'
                type='tel'
                inputProps={{
                  pattern: '[0-9]'
                }}
                onChange={handleChange}
                value={state.contact}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                type='email'
                autoComplete='email'
                onChange={handleChange}
                value={state.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                id='password'
                autoComplete='current-password'
                onChange={handleChange}
                value={state.password}
                type={state.showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
          <FormHelperText error>{state.error ? state.error : ' '}</FormHelperText>
          <Grid container justify='center'>
            <Button
              type='submit'
              width='50%'
              height='50%'
              variant='contained'
              color='primary'
              className={classes.submit}
              style={{ borderRadius: 25 }}
            >
              Sign Up
            </Button>
          </Grid>
          <Grid container justify='center'>
            <Grid item>
              <Link href='/login'>
                <a className={classes.link}>Already have an account? Log in</a>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </CenterForm>
  )
}
