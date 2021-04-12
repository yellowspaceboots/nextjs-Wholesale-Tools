import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import FilterListIcon from '@material-ui/icons/FilterList'
import { useRouter } from 'next/router'
import { useDrowDown } from './DropDownProvider'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/core/Autocomplete'
import Button from '@material-ui/core/Button'
import { Controller, useForm } from 'react-hook-form'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import ListboxComponent from './VirtualizedList'
import { deepEqual } from '../lib/utils'
import isValid from 'date-fns/isValid'
import DesktopDatePicker from '@material-ui/lab/DatePicker'
import format from 'date-fns/format'

const FilterForm = () => {
  const { salesmen, customers, outsideSalesmen } = useDrowDown()
  const router = useRouter()
  const [filterOpen, toggleFilterOpen] = useState(false)
  const handleToggleFilterOpen = () => toggleFilterOpen(!filterOpen)
  const intialState = {
    start: router.query.start ? new Date(router.query.start) : null,
    end: router.query.end ? new Date(router.query.end) : null,
    outsideSalesmen: router.query.outside ? outsideSalesmen.filter(outsideSalesmen => outsideSalesmen.number === router.query.outside)[0] : null,
    insideSalesmen: router.query.inside ? salesmen.filter(salesman => salesman.number === router.query.inside)[0] : null,
    customer: router.query.account ? customers.filter(customer => customer.account === router.query.account)[0] : null
  }
  useEffect(() => {
    if (router.query) {
      filterReset(intialState)
    }
  }, [router.query])
  const {
    control: filterControl,
    handleSubmit: filterHandleSubmit,
    reset: filterReset,
    watch: filterWatch
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: intialState
  })
  const onSubmit = (data, e) => {
    const fullQuery = {
      start: data.start ? format(new Date(data.start), 'MM/dd/yyyy') : null,
      end: data.end ? format(new Date(data.end), 'MM/dd/yyyy') : null,
      status: router.query.status,
      inside: data.insideSalesmen?.number,
      outside: data.outsideSalesmen?.number,
      account: data.customer?.account
    }
    const query = Object.fromEntries(Object.entries(fullQuery).filter(([_, v]) => v != null))
    router.push({
      pathname: '/quotations',
      query
    })
  }
  const watchAllFields = filterWatch()
  const watchStart = filterWatch('start')
  const watchEnd = filterWatch('end')
  const compareWatch = {
    ...watchAllFields,
    start: watchStart ? format(new Date(watchStart), 'MM/dd/yyyy') : null,
    end: watchEnd ? format(new Date(watchEnd), 'MM/dd/yyyy') : null
  }
  const compareInitialState = {
    ...intialState,
    start: intialState.start ? format(new Date(intialState.start), 'MM/dd/yyyy') : null,
    end: intialState.end ? format(new Date(intialState.end), 'MM/dd/yyyy') : null
  }
  const buttonDisabled = deepEqual(compareWatch, compareInitialState)
  return (
    <>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography variant='subtitle1' style={{ margin: 10, marginLeft: 0 }}>Quotations</Typography>
        <div>
          <IconButton aria-label='filter' onClick={handleToggleFilterOpen}>
            <FilterListIcon />
          </IconButton>
        </div>
      </Grid>
      {filterOpen && (
        <form onSubmit={filterHandleSubmit(onSubmit)}>
          <Grid xs={12} item container spacing={2} direction='row' style={{ marginBottom: 12 }}>
            <Grid item>
              <Controller
                name='start'
                rules={{ validate: value => isValid(value) || value === null }}
                control={filterControl}
                defaultValue={intialState.start}
                render={props => {
                  return (
                    <DesktopDatePicker
                      {...props.field}
                      label='Start'
                      renderInput={(params) => (
                        <TextField {...params} size='small' style={{ width: 175 }} variant='outlined' helperText={!!filterControl.start && 'Not a valid Date'} />
                      )}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item>
              <Controller
                name='end'
                rules={{ validate: value => isValid(value) || value === null }}
                control={filterControl}
                defaultValue={intialState.end}
                render={props => {
                  return (
                    <DesktopDatePicker
                      {...props.field}
                      label='End'
                      renderInput={(params) => (
                        <TextField {...params} size='small' style={{ width: 175 }} variant='outlined' helperText={!!filterControl.end && 'Not a valid Date'} />
                      )}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item>
              <Controller
                name='customer'
                control={filterControl}
                render={({ field: { onChange, onBlur, value, ref } }) => {
                  return (
                    <Autocomplete
                      id='customer'
                      options={customers}
                      value={value}
                      style={{ minWidth: 400 }}
                      onChange={(e, val) => onChange(val)}
                      getOptionLabel={(option) => option.name}
                      getOptionSelected={(option, value) => option.account === value.account}
                      renderInput={(params) =>
                        <TextField
                          {...params}
                          label='Customer'
                          variant='outlined'
                          size='small'
                          fullWidth
                        />}
                      ListboxComponent={ListboxComponent}
                      renderOption={(props, option, { inputValue }) => {
                        const fullOption = `${option.account} - ${option.name}`
                        const matches = match(fullOption.trim(), inputValue)
                        const parts = parse(fullOption.trim(), matches)
                        return (
                          <li {...props}>
                            {parts.map((part, index) => (
                              <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                {part.text}
                              </span>
                            ))}
                          </li>
                        )
                      }}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item>
              <Controller
                name='outsideSalesmen'
                control={filterControl}
                render={({ field: { onChange, onBlur, value, ref } }) => {
                  return (
                    <Autocomplete
                      id='outsideSalesmen'
                      options={outsideSalesmen}
                      value={value}
                      style={{ minWidth: 240 }}
                      onChange={(e, val) => onChange(val)}
                      getOptionLabel={(option) => option.name}
                      getOptionSelected={(option, value) => option.number === value.number}
                      renderInput={(params) =>
                        <TextField
                          {...params}
                          label='Outside Salesman'
                          variant='outlined'
                          size='small'
                        />}
                      ListboxComponent={ListboxComponent}
                      renderOption={(props, option, { inputValue }) => {
                        const fullOption = `${option.number}-${option.name}`
                        const matches = match(fullOption.trim(), inputValue)
                        const parts = parse(fullOption.trim(), matches)
                        return (
                          <li {...props}>
                            {parts.map((part, index) => (
                              <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                {part.text}
                              </span>
                            ))}
                          </li>
                        )
                      }}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item>
              <Controller
                name='insideSalesmen'
                control={filterControl}
                render={({ field: { onChange, onBlur, value, ref } }) => {
                  return (
                    <Autocomplete
                      id='insideSalesmen'
                      options={salesmen}
                      value={value}
                      style={{ minWidth: 240 }}
                      onChange={(e, val) => onChange(val)}
                      getOptionLabel={(option) => option.name}
                      getOptionSelected={(option, value) => option.number === value.number}
                      renderInput={(params) =>
                        <TextField
                          {...params}
                          label='Assigned To'
                          variant='outlined'
                          size='small'
                        />}
                      ListboxComponent={ListboxComponent}
                      renderOption={(props, option, { inputValue }) => {
                        const fullOption = `${option.number}-${option.name}`
                        const matches = match(fullOption.trim(), inputValue)
                        const parts = parse(fullOption.trim(), matches)
                        return (
                          <li {...props}>
                            {parts.map((part, index) => (
                              <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                {part.text}
                              </span>
                            ))}
                          </li>
                        )
                      }}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item>
              <Button disabled={buttonDisabled} type='submit'>Update</Button>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  )
}

export default FilterForm
