import React from 'react'
import { getLayout } from '../../components/Layout'
import ProjectList from '../../components/ProjectList'
import FilterForm from '../../components/FilterForm'

const Quotations = () => {
  return (
    <>
      <FilterForm name='Quotations' route='/quotations' />
      <ProjectList />
    </>
  )
}

Quotations.getLayout = getLayout

export default Quotations
