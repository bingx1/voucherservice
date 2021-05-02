import React from 'react'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

export default function Copyright() {
  return (
    <Typography variant='body2' style={{ color: 'white' }} align='center'>
      {`Copyright © ${new Date().getFullYear()}`}
      <Link style={{ color: 'white' }} href='https://material-ui.com/'>
        Voucher_Service
      </Link>
    </Typography>
  )
}
