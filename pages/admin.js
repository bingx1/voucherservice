import React from 'react'
import { makeStyles, Paper } from '@material-ui/core'
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

export default function Admin() {
  const classes = useStyles()

  return (
    <CenterBox>
      <Paper elevation={2} className={classes.paper}></Paper>
    </CenterBox>
  )
}
