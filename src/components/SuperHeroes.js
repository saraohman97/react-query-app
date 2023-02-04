import { useState, useEffect } from 'react'
import axios from 'axios'

const SuperHeroes = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/superheroes').then((res) => {
      setData(res.data)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <h2>Super Hero Page</h2>
      {data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>
      })}
    </>
  )
}

export default SuperHeroes