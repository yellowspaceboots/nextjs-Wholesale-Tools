import React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import LinearProgress from '@mui/material/LinearProgress'
import { useMutation } from '@apollo/client'
import cookie from 'js-cookie'
import { useAuth } from '../components/AuthProvider'
import Router from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import Image from 'next/image'
import { initializeApollo } from '../lib/apollo'

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
  imageTest: {
    zIndex: -20,
    height: '100vh'
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
  const classes = useStyles()
  const { user } = useAuth()

  const signin = async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (response.status !== 200) {
      throw new Error(await response.text())
    }

    Router.reload(window.location.pathname)
  }

  const initialState = {
    email: '',
    password: ''
  }
  const {
    formState: { errors: loginErrors },
    handleSubmit: loginHandleSubmit,
    control: loginControl
  } = useForm({ defaultValues: initialState })

  const onSubmit = async (formData, e) => {
    const email = formData.email.trim()
    const password = formData.password.trim()
    try {
      await signin(email, password)
      Router.reload(window.location.pathname)
      // loginUser({ variables: { input: { email, password } } })
    } catch (error) {
      console.error(error)
    }
  }
  const onError = (errors, e) => console.log(errors, e)
  if (user) return null
  return (
    <>
      {/* mutationLoading && <LinearProgress color='secondary' style={{ position: 'absolute', top: 0, left: 0, width: '100%' }} /> */}
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
            <form className={classes.form} onSubmit={loginHandleSubmit(onSubmit, onError)}>
              <Controller
                render={({ field }) => <TextField
                  {...field}
                  autoComplete='email'
                  variant='outlined'
                  name='email'
                  id='email'
                  label='Email Address'
                  fullWidth
                  autoFocus
                  margin='normal'
                  error={!!loginErrors.email}
                  helperText={loginErrors.email && 'Email Cannot Be Blank'}
                                       />}
                name='email'
                control={loginControl}
                rules={{ required: true }}
                defaultValue=''
              />
              <Controller
                render={({ field }) => <TextField
                  {...field}
                  autoComplete='current-password'
                  variant='outlined'
                  name='password'
                  label='Password'
                  type='password'
                  id='current-password'
                  fullWidth
                  autoFocus
                  margin='normal'
                  error={!!loginErrors.password}
                  helperText={loginErrors.password ? 'Password Cannot Be Blank' : ''}
                                       />}
                name='password'
                control={loginControl}
                rules={{ required: true }}
                defaultValue=''
              />
              {/*
              <TextField
                autoComplete='email'
                variant='outlined'
                name='email'
                id='email'
                label='Email Address'
                fullWidth
                autoFocus
                margin='normal'
                error={!!loginErrors.email || mutationError}
                helperText={loginErrors.email ? 'Email Cannot Be Blank' : mutationError ? mutationError.message : ''}
                inputRef={{ ...loginRegister('email', { required: true }) }}
              />
              <TextField
                autoComplete='current-password'
                variant='outlined'
                name='password'
                label='Password'
                type='password'
                id='password'
                fullWidth
                autoFocus
                margin='normal'
                error={!!loginErrors.password || mutationError}
                helperText={loginErrors.password ? 'Password Cannot Be Blank' : mutationError ? mutationError.message : ''}
                inputRef={{ ...loginRegister('password', { required: true }) }}
              />
              */}

              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                type='submit'
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
