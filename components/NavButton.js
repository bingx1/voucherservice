import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import Link from 'next/link'

const useStyles = makeStyles(() => ({
  root: {
    textDecoration: 'none',
    paddingRight: 10,
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  buttonStyle: {
    variant: 'h2',
    fontFamily: ['Roboto Mono', 'monospace'],
    fontSize: 18,
    fontWeight: 500,
    textTransform: 'none',
    boxShadow: 'none',
    backgroundColor: 0,
    borderColor: 0
  }
}))

export default function NavButton(props) {
  const classes = useStyles()

  return (
    <div>
      <Link href={props.url}>
        <a className={classes.root}>
          <Button className={classes.buttonStyle} color='inherit'>
            {props.text}
          </Button>
        </a>
      </Link>
    </div>
  )
}
