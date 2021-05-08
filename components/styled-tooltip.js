import { makeStyles, Tooltip } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.secondary.main
  },
  tooltip: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}))

export default function StyledTooltip(props) {
  const classes = useStyles()
  return <Tooltip classes={classes} {...props} />
}
