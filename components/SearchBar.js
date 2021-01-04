import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/core/Autocomplete'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles, alpha } from '@material-ui/core/styles'
import { useLazyQuery } from '@apollo/client'
import { PROJECT_SEARCH } from '../testApi/queries/projectSearch'
import useDebounce from '../utils/useDebounce'
import CircularProgress from '@material-ui/core/CircularProgress'
import AssessmentIcon from '@material-ui/icons/Assessment'
import Avatar from '@material-ui/core/Avatar'
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    marginRight: 10,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    },
    '& .MuiAutocomplete-input': {
      color: 'white',
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 300,
        '&:focus': {
          width: 300
        }
      }
    },
    '& .MuiAutocomplete-clearIndicator': {
      color: 'white'
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

const SearchBar = () => {
  const classes = useStyles()
  const [value, setValue] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState([])
  const debouncedSearch = useDebounce((nextValue) => projectSearch({ variables: { input: nextValue } }), 700)
  const [projectSearch, { loading, data }] = useLazyQuery(PROJECT_SEARCH, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      console.log(data)
      setOptions(data.projectSearch.data)
    },
    onError: (error) => console.log(error)
  })

  useEffect(() => {
    let active = true
    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    if (active && inputValue.trim().length > 2) {
      debouncedSearch(inputValue)
    }

    return () => {
      active = false
    }
  }, [value, inputValue])

  return (
    <Autocomplete
      id='search-bar'
      style={{ width: 300 }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.title}
      filterOptions={(x) => x}
      options={options}
      loading={loading}
      autoComplete
      popupIcon={false}
      includeInputInList
      classes={{ root: classes.search }}
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options)
        setValue(newValue)
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder='Search'
          fullWidth
          size='small'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {params.InputProps.endAdornment}
              </>
            )
          }}
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
          <Link key={option._id} href={'/quotations/' + option._id}>
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
}

export default SearchBar
