import { useQueries } from "react-query"
import axios from 'axios'

const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:8000/superheroes/${heroId}`)
}

export const DynamicParallel = ({ heroIds }) => {
    const queryResults = useQueries(
        heroIds.map(id => {
            return {
                queryKey: ['super-hero', id],
                queryFn: () => fetchSuperHero(id)
            }
        })
    )
    console.log({queryResults})
    return <div>Dynamic parallel</div>
}