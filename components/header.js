import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/client'
import NavButton from './nav-button'
import { AppBar, Toolbar, Typography, Button, Fab, IconButton, makeStyles } from '@material-ui/core'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined'
import ExitToAppOutlined from '@material-ui/icons/ExitToAppOutlined'
import StyledTooltip from './styled-tooltip'

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
      alignItems: 'center'
    }
  },

  title: {
    fontSize: 18,
    fontWeight: 600,
    fontFamily: ['Roboto Mono', 'monospace'],
    textTransform: 'capitalize'
  },

  nav: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  icon: {
    marginLeft: 10,
    border: 'white 3px solid'
  }
}))

export default function Header() {
  const classes = useStyles()
  const [session] = useSession()

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Link href='/'>
            <Fab variant='extended' color='primary'>
              <Typography variant='h6' className={classes.title}>
                {'>'} Voucher_Service
              </Typography>
            </Fab>
          </Link>
          {!session ? (
            <div className={classes.nav}>
              <NavButton url='/signup' text='Sign Up' />
              <NavButton url='/login' text='Log In' />
            </div>
          ) : (
            <div className={classes.nav}>
              <Link href={session.isAdmin ? '/admin' : '/user'}>
                <StyledTooltip title={session.isAdmin ? 'Admin' : 'User'}>
                  <IconButton color='inherit' size='small' className={classes.icon}>
                    {session.isAdmin ? <PeopleAltOutlinedIcon /> : <PersonOutlineOutlinedIcon />}
                  </IconButton>
                </StyledTooltip>
              </Link>
              <StyledTooltip title='Log Out'>
                <IconButton
                  color='inherit'
                  onClick={() => {
                    window.localStorage.removeItem('vs-admin')
                    signOut({ callbackUrl: '/' })
                  }}
                  size='small'
                  className={classes.icon}
                >
                  <ExitToAppOutlined />
                </IconButton>
              </StyledTooltip>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
