import { Statistic } from "../types"
import backendRequest from "./requests"

const BACKEND_STATS_URL = 'http://localhost:8000/api/reviews/stats/'

export const fetchProgress = async (id: string) => {

    // Get Backend URL
    const DJANGO_HOST = process.env.NEXT_PUBLIC_DJANGO_HOST
    const DJANGO_PORT = process.env.NEXT_PUBLIC_DJANGO_PORT

    const url = `http://${DJANGO_HOST}:${DJANGO_PORT}/api/reviews/stats/${id}/`
    const response = await backendRequest(url, 'GET')
    const { field_count, accpected_count }: Statistic = await response.json()
    return Math.round((accpected_count / field_count) * 100)
}