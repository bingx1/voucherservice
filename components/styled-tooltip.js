import React from 'react'
import { makeStyles, Tooltip } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.secondary.main
  },
  tooltip: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}))

const StyledTooltip = React.forwardRef((props, ref) => {
  const classes = useStyles()
  return (
    <Tooltip ref={ref} classes={classes} {...props}>
      {props.children}
    </Tooltip>
  )
})

export default StyledTooltip
