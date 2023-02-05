import { useQuery } from "react-query"
import axios from 'axios'

const fetchUserById = (email) => {
    return axios.get(`http://localhost:8000/users/${email}`)
}

const fetchCoursesByChannelId = (channelId) => {
    return axios.get(`http://localhost:8000/channels/${channelId}`)
}

export const DependentQueries = ({ email }) => {
    const { data: user } = useQuery(['user', email], () =>
        fetchUserById(email)
    )
    const channelId = user?.data.channelId

    useQuery(['courses', channelId], () =>
        fetchCoursesByChannelId(channelId), {
        enabled: !!channelId,
    })

    return <div>Dependent Queries</div>
}