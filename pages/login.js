import React, { useState } from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Link from 'next/link'
import { getSession, signIn } from 'next-auth/client'
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
import { Visibility, VisibilityOff } from '@material-ui/icons'
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

export default function LogIn() {
  const classes = useStyles()

  const [state, setState] = useState({
    email: '',
    password: '',
    error: '',
    showPassword: false
  })

  const handleChange = (e) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const response = await signIn('credentials', { email: state.email, password: state.password, redirect: false })

    if (response.status === 200) {
      window.location.href = '/'
    } else {
      setState((state) => ({ ...state, error: 'The Email or Password was Incorrect' }))
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
          Log In
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            type='email'
            autoComplete='email'
            autoFocus
            onChange={handleChange}
            value={state.email}
          />
          <TextField
            variant='outlined'
            margin='normal'
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

          <FormHelperText error>{state.error ? state.error : ' '}</FormHelperText>
          <Grid container justify='center'>
            <Button
              type='submit'
              width='50%'
              height='50%'
              justify='center'
              variant='contained'
              color='primary'
              className={classes.submit}
              style={{ borderRadius: 25 }}
            >
              Log In
            </Button>
          </Grid>
          <Grid container justify='center'>
            <Grid item>
              <Link href='/signup'>
                <a className={classes.link}>Don't have an account? Sign up</a>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </CenterForm>
  )
}
