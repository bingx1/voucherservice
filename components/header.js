import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import NavButton from './NavButton';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    width: '100%',
    zIndex: 100,
    padding: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    // paddingRight:
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: 600,
    paddingLeft: '10px'
  },
  logoIcon: {
    flexGrow: 1,
    paddingLeft: '0px',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link href='/'>
              <a className={classes.logoIcon}>
                <IconButton>
                    <LoyaltyIcon></LoyaltyIcon>
                    <Typography variant="h6" className={classes.title}> Voucher Service </Typography>
                </IconButton>
              </a>
          </Link>
          <NavButton url='/signup' text='Sign up' color="inherit"/>
          <NavButton url='/login' text='Login' color="inherit"/>
        </Toolbar>
      </AppBar>
    </div>
  );
}