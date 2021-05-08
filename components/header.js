import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
import { Button, Fab } from '@material-ui/core'
import { useSession, signOut } from 'next-auth/client'
import NavButton from './nav-button'
import { Button, Fab, IconButton } from '@material-ui/core'
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
      alignItems: 'flex-end'
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
    justifyContent: 'space-around',
    [theme.breakpoints.only('xs')]: {
      display: 'none'
    }
  },
  icon: {
    marginLeft: 10,
    border: 'white 3px solid'
  }
}))

export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false)
  const classes = useStyles()
  const [ session, loading ] = useSession()

    setloggedInEmail(window.localStorage.getItem('vs-email') || null)
  useEffect(() => {
  }, [])
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
            <div className={classes.buttons}>
              <NavButton url='/signup' text='Sign Up' />
              <NavButton url='/login' text='Log In' />
            </div>
          ) : (
            <div className={classes.nav}>
              <StyledTooltip title={isAdmin ? 'Admin' : 'User'}>
                <Link href={isAdmin ? '/admin' : '/user'}>
                  <IconButton color='inherit' size='small' className={classes.icon}>
                    {isAdmin ? <PeopleAltOutlinedIcon /> : <PersonOutlineOutlinedIcon />}
                  </IconButton>
                </Link>
              </StyledTooltip>
              <StyledTooltip title='Log Out'>
                <IconButton
                  color='inherit'
                  onClick={() => {
                    window.localStorage.removeItem('vs-email')
                    window.localStorage.removeItem('vs-admin')
                    window.location.href = '/'
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
