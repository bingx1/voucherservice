import React from 'react'
import { Tab, Tabs } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

export const StyledTabs = withStyles((theme) => ({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.text.primary,
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: theme.palette.secondary.main
    }
  }
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />)

export const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1
    }
  }
}))((props) => <Tab disableRipple {...props} />)
