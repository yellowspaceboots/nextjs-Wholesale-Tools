import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/core/Autocomplete'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useLazyQuery } from '@apollo/client'
import { PROJECT_SEARCH } from '../lib/queries/projectSearch'
import useDebounce from '../utils/useDebounce'
import CircularProgress from '@material-ui/core/CircularProgress'
import AssessmentIcon from '@material-ui/icons/Assessment'
import Avatar from '@material-ui/core/Avatar'
import Link from 'next/link'

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
      id={`search-bar-${id || ''}`}
      fullWidth
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.title}
      filterOptions={(x) => x}
      options={options}
      loading={loading}
      autoComplete
      popupIcon={false}
      includeInputInList
      openOnFocus
      freeSolo
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
