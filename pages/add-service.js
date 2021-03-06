import React, { useState } from 'react'
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

export default function AddService() {
  const classes = useStyles()

  const [state, setState] = useState({
    name: '',
    error: false,
    errorMessage: ''
  })

  const handleChange = (e) => {
    let value = e.target.value
    setState((state) => ({ ...state, [e.target.name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const response = await fetch('/api/service/add', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({
        name: state.name
      })
    })

    if (response.status === 201) {
      const service = await response.json()
      setState((state) => ({
        ...state,
        name: '',
        error: false,
        errorMessage: 'Successfully added the ' + service.name + ' service.'
      }))
    } else {
      const error = (await response.json()).error
      setState((state) => ({ ...state, error: true, errorMessage: error }))
    }
  }
  return (
    <CenterForm>
      <Paper elevation={2} className={classes.paper}>
        <Typography component='h1' variant='h5' className={classes.formTitle}>
          Add Services
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='name'
            label='New Service'
            name='name'
            autoFocus
            onChange={handleChange}
            value={state.name}
          />
          <FormHelperText error={state.error}>{state.errorMessage}</FormHelperText>
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
              Add
            </Button>
          </Grid>
        </form>
      </Paper>
    </CenterForm>
  )
}
