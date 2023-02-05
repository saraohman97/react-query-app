import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:8000/superheroes')
}

const RQSuperHeroes = () => {

  // isLoading, isError & error is prewriten?
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      enabled: false
    }
  )

  console.log({ isLoading, isFetching })

  if (isLoading || isFetching) {
    return <h2>Loading....</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>RQ Super Heroes</h2>
      <button onClick={refetch}>Fetch heroes</button>
      {
        data?.data.map(hero => {
          return <div key={hero.name}>{hero.name}</div>
        })
      }
    </>
  )
}

export default RQSuperHeroes