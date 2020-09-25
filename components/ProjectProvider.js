import React, { createContext, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useAuth } from '../components/AuthProvider'
import { GET_ACTIVE_PROJECTS_BY_SALES_NUMBER, GET_ACTIVE_PROJECTS_BY_OUTSIDE_SALESMAN } from '../testApi/queries/getActiveProjectsBySalesNumber'
import { GET_ACTIVE_PROJECTS } from '../testApi/queries/getActiveProjects'
import { GET_ALL_OPEN_PROJECTS } from '../testApi/queries/getAllOpenProjects'

const ProjectContext = createContext()

const ProjectsProvider = ({ children }) => {
  const { user } = useAuth()
  const roles = {
    INSIDESALES: {
      query: GET_ACTIVE_PROJECTS_BY_SALES_NUMBER,
      result: 'getActiveProjectsBySalesNumber',
      input: {
        active: true,
        salesman: user.salesRef.number
      }
    },
    OUTSIDESALES: {
      query: GET_ACTIVE_PROJECTS_BY_OUTSIDE_SALESMAN,
      result: 'getActiveProjectsByOutsideSalesman',
      input: {
        salesman: user.salesRef.number
      }
    },
    MANAGER: {
      query: GET_ALL_OPEN_PROJECTS,
      result: 'getAllOpenProjects',
      input: {
        size: 500
      }
    }
  }
  const query = roles[user.role].query
  const variables = roles[user.role].input
  const resultPath = roles[user.role].result
  const { loading, error, data, refetch } = useQuery(query, { variables })
  return (
    <ProjectContext.Provider value={{ loading, error, data, refetch, resultPath, query, variables }}>{children}</ProjectContext.Provider>
  )
}

const useProjects = () => useContext(ProjectContext)

export { ProjectsProvider, useProjects }
