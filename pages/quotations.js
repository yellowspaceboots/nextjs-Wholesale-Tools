import React, { useState } from 'react'
import { getLayout } from '../components/Layout'
import ProjectList from '../components/ProjectList'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import FilterListIcon from '@material-ui/icons/FilterList'

const Quotations = () => {
  const [filterOpen, toggleFilterOpen] = useState(false)
  const handleToggleFilterOpen = () => toggleFilterOpen(!filterOpen)
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
          <IconButton aria-label='filter' onClick={() => handleToggleFilterOpen()}>
            <FilterListIcon />
          </IconButton>
        </div>
      </Grid>
      <ProjectList filterOpen={filterOpen} />
    </>
  )
}

Quotations.getLayout = getLayout

export default Quotations
