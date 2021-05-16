import { Grid } from '@material-ui/core'
import React from 'react'

export default function BookingContainer({ children }) {
  return (
    <Grid container spacing={2} justify='center' alignItems='center'>
      {children}
    </Grid>
  )
}
