import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
  List,
  ListItem
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { getSession, signOut } from 'next-auth/client'
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

const PERSONAL_INFORMATION = 'Personal Information'
const BILLER_INFORMATION = 'Biller Information'

const EditInfo = () => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    password: '',
    invoiceName: '',
    billEmail: '',
    error: '',
    success: '',
    showPassword: false,
    menuItem: PERSONAL_INFORMATION
  })

  const classes = useStyles()

  const handleChange = (e) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value, error: '', success: '' }))
  }

  const handleListItemClick = (e) => {
    setState((state) => ({ ...state, menuItem: e.target.innerText, error: '', success: '' }))
  }

  async function handleSave() {
    const session = await getSession()
    const sessionEmail = session.user.email

    const response = await fetch('/api/user/info', {
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
        invoiceName: state.invoiceName,
        billEmail: state.billEmail,
        password: state.password
      })
    })

    if (response.status === 201) {
      const user = await response.json()

      setState((state) => ({ ...state, success: 'Profile successfully updated' }))
      if (sessionEmail !== user.email) signOut({ callbackUrl: '/' })
    } else {
      const error = (await response.json()).error
      setState((state) => ({ ...state, error: error }))
    }
  }

  // TODO: Send PATCH/POST req to /api/user/change-password
  const handleChangePassword = () => {}

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  const handleMouseDownPassword = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    async function getUser() {
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

    getUser().then(({ firstName, lastName, contact, email, invoiceName, billEmail }) => {
      setState((state) => ({
        ...state,
        firstName,
        lastName,
        contact,
        email,
        invoiceName: invoiceName ? invoiceName : '',
        billEmail: billEmail ? billEmail : ''
      }))
    })
  }, [])

  return (
    <CenterBox>
      <Paper elevation={2} className={classes.paper}>
        <Typography component='h1' variant='h5' className={classes.text}>
          Edit Profile
        </Typography>
        <Grid container spacing={1}>
          {/* ---------------------------------- MENU ---------------------------------- */}

          <Grid item container xs={12} md={2}>
            <List>
              <ListItem button onClick={handleListItemClick}>
                {PERSONAL_INFORMATION}
              </ListItem>
              <ListItem button onClick={handleListItemClick}>
                {BILLER_INFORMATION}
              </ListItem>
            </List>
          </Grid>

          {/* -------------------------- PERSONAL INFORMATION -------------------------- */}

          {state.menuItem === PERSONAL_INFORMATION && (
            <Grid item container spacing={2} xs={12} md={10}>
              <Grid item xs={12}>
                <Typography component='h2' variant='h6'>
                  {PERSONAL_INFORMATION}
                </Typography>
              </Grid>

              {/* ---------------------------------- NAME ---------------------------------- */}

              <Grid item xs={12} sm={6}>
                <Typography>First Name</Typography>
                <TextField
                  autoComplete='fname'
                  name='firstName'
                  variant='outlined'
                  fullWidth
                  id='firstName'
                  autoFocus
                  onChange={handleChange}
                  value={state.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>Last Name</Typography>
                <TextField
                  variant='outlined'
                  fullWidth
                  id='lastName'
                  name='lastName'
                  autoComplete='lname'
                  onChange={handleChange}
                  value={state.lastName}
                />
              </Grid>

              {/* --------------------------------- CONTACT -------------------------------- */}

              <Grid item xs={12}>
                <Typography>Contact Number</Typography>
                <TextField
                  variant='outlined'
                  fullWidth
                  id='contact'
                  name='contact'
                  type='tel'
                  inputProps={{
                    pattern: '[0-9]'
                  }}
                  onChange={handleChange}
                  value={state.contact}
                />
              </Grid>

              {/* ---------------------------------- EMAIL --------------------------------- */}

              <Grid item xs={12}>
                <Typography>Email</Typography>
                <TextField
                  variant='outlined'
                  fullWidth
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  onChange={handleChange}
                  value={state.email}
                />
              </Grid>

              {/* ----------------------------- CHANGE PASSWORD ---------------------------- */}

              <Grid item container xs={12}>
                <Grid item xs={12}>
                  <Typography component='h2' variant='h6'>
                    Change Password
                  </Typography>
                </Grid>

                {/* --------------------------- NEW PASSWORD FIELD --------------------------- */}

                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    label='New Password'
                    fullWidth
                    name='password'
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

                {/* ------------------------- CHANGE PASSWORD BUTTON ------------------------- */}
              </Grid>

              {/* -------------------------- ERROR / SUCCESS TEXT -------------------------- */}

              <Grid item xs={12} container justify='center' alignItems='center'>
                <FormHelperText error={state.error ? true : false}>
                  {state.error ? state.error : state.success}
                </FormHelperText>
              </Grid>

              {/* ------------------------------- SAVE BUTTON ------------------------------ */}

              <Grid container justify='center'>
                <Button
                  onClick={handleSave}
                  width='50%'
                  height='50%'
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  style={{ borderRadius: 25 }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          )}

          {/* --------------------------- BILLER INFORMATION --------------------------- */}

          {state.menuItem === BILLER_INFORMATION && (
            <Grid item container spacing={2} xs={12} md={10}>
              <Grid item xs={12}>
                <Typography component='h2' variant='h6'>
                  {BILLER_INFORMATION}
                </Typography>
              </Grid>

              {/* ------------------------------- BILLER NAME ------------------------------ */}

              <Grid item xs={12}>
                <Typography>Invoice Name</Typography>
                <TextField
                  variant='outlined'
                  fullWidth
                  id='invoiceName'
                  name='invoiceName'
                  type='text'
                  onChange={handleChange}
                  value={state.invoiceName}
                />
              </Grid>

              {/* ------------------------------ BILLER EMAIL ------------------------------ */}

              <Grid item xs={12}>
                <Typography>Biller Email</Typography>
                <TextField
                  variant='outlined'
                  fullWidth
                  id='billEmail'
                  name='billEmail'
                  type='email'
                  autoComplete='email'
                  onChange={handleChange}
                  value={state.billEmail}
                />
              </Grid>

              {/* -------------------------- ERROR / SUCCESS TEXT -------------------------- */}

              <Grid item xs={12} container justify='center' alignItems='center'>
                <FormHelperText error={state.error ? true : false}>
                  {state.error ? state.error : state.success}
                </FormHelperText>
              </Grid>

              {/* ------------------------------- SAVE BUTTON ------------------------------ */}

              <Grid container justify='center'>
                <Button
                  onClick={handleSave}
                  width='50%'
                  height='50%'
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  style={{ borderRadius: 25 }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Paper>
    </CenterBox>
  )
}

export default EditInfo
