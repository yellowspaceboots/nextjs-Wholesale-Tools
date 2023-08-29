import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { useLazyQuery } from '@apollo/client'
import { PROJECT_SEARCHV2 } from '../lib/queries/projectSearchV2'
import { GET_QUOTATIONS } from '../lib/queries/getQuotations'
import useDebounce from '../utils/useDebounce'
import CircularProgress from '@mui/material/CircularProgress'
import AssessmentIcon from '@mui/icons-material/Assessment'
import Avatar from '@mui/material/Avatar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Controller, useForm, useWatch } from 'react-hook-form'

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.common.white
    }
  },
  avatar: {
    margin: 10,
    marginLeft: 0
  },
  blueAvatar: {
    margin: 10,
    marginLeft: 0,
    color: '#fff',
    backgroundColor: theme.palette.primary.main
  },
  yellowAvatar: {
    margin: 10,
    marginLeft: 0,
    color: '#fff',
    backgroundColor: theme.palette.secondary.main
  },
  greenAvatar: {
    margin: 10,
    marginLeft: 0,
    color: '#fff',
    backgroundColor: 'green'
  }
}))

const SearchBar = ({ id }) => {
  const {
    control: searchControl,
    handleSubmit: searchHandleSubmit,
    reset: searchReset,
    watch: searchWatch
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const onSubmit = (data) => {
      if (data.search ? data.search.trim().length > 2 : false) {
        searchReset()
        setOptions([])
        router.push(`/search?search=${data.search}`)
      }
  }

  const router = useRouter()
  const classes = useStyles()
  const [options, setOptions] = useState([])
  const searchValue = searchWatch('search')
  const debouncedSearch = useDebounce((nextValue) => getQuotations({ variables: { input: nextValue } }), 700)
  
  const [getQuotations, { loading, data }] = useLazyQuery(GET_QUOTATIONS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (searchValue) {
        const myOptions = data.getQuotations.data.splice(5)
        setOptions(myOptions)
      }
    },
    onError: (error) => console.log(error)
  })


  useEffect(() => {
    let active = true
    if (searchValue === '') {
      setOptions(searchValue ? [searchValue] : [])
      return undefined
    }

    if (active && (searchValue ? searchValue.trim().length > 2 : false)) {
      const input = {
        start: null,
        end: null,
        inside: null,
        outsideSales: null,
        account: null,
        status:  null,
        search: searchValue
      }
      debouncedSearch(input)
    }

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, router.asPath])
  return (
    <form onSubmit={searchHandleSubmit(onSubmit)} style={{width: '100%'}}>
      <Controller
      name='search'
      control={searchControl}
      defaultValue=''
      render={({ field: { onChange, onBlur, value, ref } }) => {
        return (
          <Autocomplete
            id={`search-bar-${id || ''}`}
            fullWidth
            getOptionLabel={(option) =>
              typeof option === 'string' ? option : option.title}
            filterOptions={(x) => x}
            options={options}
            loading={loading}
            popupIcon={false}
            freeSolo
            classes={{ root: classes.search }}
            filterSelectedOptions
            value={value}
            onInputChange={(e, val) => onChange(val)}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  // Prevent's default 'Enter' behavior.
                  event.defaultMuiPrevented = true;
                  // your handler code
                }
              }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Search by Quote Name...'
                fullWidth
                size='small'
              />
            )}
            renderOption={(props, option) => {
              const avatarSelector = {
                'On Track': classes.greenAvatar,
                'At Risk': classes.greenAvatar,
                Pending: classes.yellowAvatar,
                'Off Track': classes.greenAvatar,
                Closed: classes.avatar
              }
              const avatarIcon = avatarSelector[option.status] || classes.avatar
              return (
                <Link key={option._id} href={'/quotations/' + option._id} passHref>
                  <li {...props}>
                    <Grid container alignItems='center'>
                      <Grid item>
                        <Avatar className={avatarIcon}>
                          <AssessmentIcon />
                        </Avatar>
                      </Grid>
                      <Grid item xs>
                        <Typography variant='body2' color='textSecondary'>
                          {option.title}
                        </Typography>
                        <Typography variant='body2' color='textSecondary'>
                          {option.status}
                        </Typography>
                      </Grid>
                    </Grid>
                  </li>
                </Link>
              )
            }}
          />
        )
      }}
    />
  </form>
  )
}

export default SearchBar
