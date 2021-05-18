import Head from 'next/head'
import Copyright from '../components/copyright'
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    padding: '5rem 0',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    '@media (min-width:0px) and (orientation: landscape)': {
      minHeight: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:0px) and (orientation: landscape)'].minHeight}px)`
    },
    '@media (min-width:600px)': {
      minHeight: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`
    }
  },
  divTitle: {
    background: theme.palette.primary.dark,
    borderRadius: 40,
    padding: 20,
    fontFamily: ['Roboto Mono', 'monospace'],
    transition: 'background 0.2s',
    '&:hover': {
      background: theme.palette.primary.main,
      transition: 'background 0.2s'
    }
  },

  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  footer: {
    width: '100%',
    height: '100px',
    borderTop: '1px solid #eaeaea',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& a': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
}))

export default function Home() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <main className={classes.main}>
        <div className={classes.divTitle}>
          <Typography variant='h3' component='h2' className={classes.title}>
            Welcome to Voucher_Service!
          </Typography>
        </div>
      </main>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </div>
  )
}
