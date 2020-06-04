import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import { useMutation } from '@apollo/client'
import cookie from 'js-cookie'
import { LOGIN_USER } from '../api/mutations/loginUser'
import { useAuth } from '../components/AuthProvider'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(/splash.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    height: 85,
    width: 85
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const Login = () => {
  const { user, checked, setUser } = useAuth()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const classes = useStyles()
  const [loginUser, { loading: mutationLoading, error: mutationError }] = useMutation(LOGIN_USER, {
    variables: {
      input: {
        email,
        password
      }
    },
    onCompleted: data => {
      cookie.set('token', data.loginUser, {
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        expires: 2
      })
      setUser(true)
    }
  })
  if (user) return null
  return (
    <>
      {mutationLoading && <LinearProgress color='secondary' style={{ position: 'absolute', top: 0, left: 0, width: '100%' }} />}
      <Grid container component='main' className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon style={{ fontSize: 50, fontWeight: 100 }} />
            </Avatar>
            <Typography component='h1' variant='h5'>
            Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                error={Boolean(mutationError)}
                helperText={Boolean(mutationError) && mutationError.message}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={async () => loginUser()}
              >
              Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                  Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default Login
