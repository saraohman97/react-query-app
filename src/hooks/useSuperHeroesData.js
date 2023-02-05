import { useQuery, useMutation, useQueryClient } from "react-query"
import {request} from '../utils/axios-utils'

const fetchSuperHeroes = () => {
    // return axios.get('http://localhost:8000/superheroes')
    return request({url: '/superheroes'})
}

const addSuperHero = (hero) => {
    // return axios.post(`http://localhost:8000/superheroes`, hero)
    return request({url: '/superheroes', method: 'post', data: hero})
}

export const useSuperHeroData = (onSuccess, onError) => {
    return useQuery(
        'super-heroes',
        fetchSuperHeroes,
        {
            onSuccess,
            onError,
        }
    )
}

export const useAddSuperHeroData = () => {
    const queryClient = useQueryClient()
    return useMutation(addSuperHero, {
        // onSuccess: (data) => {
        // queryClient.invalidateQueries('super-heroes')
        // queryClient.setQueryData('super-heroes', (oldQueryData) => {
        //     return {
        //         ...oldQueryData,
        //         data: [...oldQueryData.data, data.data]
        //     }
        // })
        // }
        onMutate: async (newHero) => {
            await queryClient.cancelQueries('super-heroes')
            const previousHeroData = queryClient.getQueryData('super-heroes')
            queryClient.setQueryData('super-heroes', (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [
                        ...oldQueryData.data,
                        { id: oldQueryData?.data?.length + 1, ...newHero }
                    ]
                }
            })
            return {
                previousHeroData
            }
        },
        onError: (_error, _hero, context) => {
            queryClient.setQueryData('super-hero', context.previousHeroData)
        },
        onSettled: () => {
            queryClient.invalidateQueries('super-heroes')
        }
    })
}