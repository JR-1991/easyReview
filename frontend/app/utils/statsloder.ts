import { Statistic } from "../types"

const BACKEND_STATS_URL = 'http://localhost:8000/api/reviews/stats/'

export const fetchProgress = async (id: string) => {
    const response = await fetch(`${BACKEND_STATS_URL}${id}/`)
    const { field_count, accpected_count }: Statistic = await response.json()
    return Math.round((accpected_count / field_count) * 100)
}