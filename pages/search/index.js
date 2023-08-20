import React from 'react'
import { getLayout } from '../../components/Layout'
import ProjectList from '../../components/ProjectList'
import FilterForm from '../../components/FilterForm'
import { useRouter } from 'next/router'

const Search = () => {
  const router = useRouter()
  const searchValue = router.query?.search
  return (
    <>
      <FilterForm name={`Search Results for "${searchValue}"`} route='/search' />
      <ProjectList />
    </>
  )
}

Search.getLayout = getLayout

export default Search
