import { useQuery } from "react-query"
import axios from 'axios'

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:8000/superheroes')
}

export const useSuperHeroData = (onSuccess, onError) => {
    return useQuery(
        'super-heroes',
        fetchSuperHeroes,
        {
            // enabled: false
            onSuccess,
            onError,
            select: (data) => {
                const superheroNames = data.data.map((hero) => hero.name)
                return superheroNames
            }
        }
    )
}