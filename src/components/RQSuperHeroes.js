import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:8000/superheroes')
}

const RQSuperHeroes = () => {

  const {isLoading, data} = useQuery('super-heroes', fetchSuperHeroes)

  if(isLoading) {
    return <h2>Loading....</h2>
  }

  return (
    <>
      <h2>RQ Super Heroes</h2>
      {
        data?.data.map(hero => {
          return <div key={hero.name}>{hero.name}</div>
        })
      }
    </>
  )
}

export default RQSuperHeroes