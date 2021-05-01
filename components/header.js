import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
import NavButton from './NavButton'
import { Button, Fab } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    width: '100%',
    zIndex: 100,
    padding: 0
  },

  appBar: {
    background: 'none',
    boxShadow: 'none'
  },

  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.only('xs')]: {
      justifyContent: 'center',
      alignItems: 'flex-end'
    }
  },

  title: {
    fontSize: 18,
    fontWeight: 600,
    fontFamily: ['Roboto Mono', 'monospace'],
    textTransform: 'capitalize'
  },

  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.only('xs')]: {
      display: 'none'
    }
  }
}))

export default function Header() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Link href='/'>
            <Fab variant='extended' color='primary'>
              <Typography variant='h6' className={classes.title}>
                > Voucher_Service
              </Typography>
            </Fab>
          </Link>
          <div className={classes.buttons}>
            <NavButton url='/signup' text='Sign Up' />
            <NavButton url='/login' text='Log In' />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
