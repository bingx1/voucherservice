import React, { useState } from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import {} from '@material-ui/core/styles'
import CenterForm from '../components/center-form'
import Link from 'next/link'
import {
  makeStyles,
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  FormHelperText,
  IconButton,
  InputAdornment,
  Paper
} from '@material-ui/core'
import { signIn } from 'next-auth/client'
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

export default function SignUp() {
  const classes = useStyles()

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    password: '',
    error: '',
    showPassword: false,
    isAdmin: false
  })

  const handleChange = (e) => {
    let value = e.target.value
    if (e.target.name == 'contact') value = value.replace(/[^0-9]+/g, '')
    setState((state) => ({ ...state, [e.target.name]: value }))
  }

  const handleSwitchChange = (e) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.checked }))
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
        password: state.password,
        isAdmin: state.isAdmin
      })
    })

    if (response.status === 201) {
      // const user = await response.json()

      // if (user.isAdmin) window.localStorage.setItem('vs-admin', true)
      signIn('credentials', { email: state.email, password: state.password, redirect: false })
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
          {/* <FormControlLabel
            control={
              <Switch checked={state.isAdmin} onChange={handleSwitchChange} name='isAdmin' />
            }
            label='Admin'
          /> */}
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
