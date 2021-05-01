import { Box, Container, CssBaseline, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    '@media (min-width:0px) and (orientation: landscape)': {
      minHeight: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:0px) and (orientation: landscape)'].minHeight}px)`
    },
    '@media (min-width:600px)': {
      minHeight: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`
    }
  }
}))

export const CenterForm = ({ children }) => {
  const classes = useStyles()

  return (
    <Box display='flex' justify='center' alignItems='center' className={classes.mainContainer}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        {children}
      </Container>
    </Box>
  )
}
