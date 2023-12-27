import backendRequest from "./requests"

export interface ReviewQuery {
    message: string,
    review_id: string,
}

export async function fetchFieldData(id: string, BACKEND_URL: string) {
    // Function to fetch specific field data from the backend

    if (!BACKEND_URL.endsWith('/')) {
        BACKEND_URL = BACKEND_URL + '/'
    }

    const url = `${BACKEND_URL}${id}`
    const res = await backendRequest(url, 'GET')
    return await res.json()
}

export default async function getDataset(
    {
        site_url,
        doi,
        api_token,
        BACKEND_URL
    }: {
        site_url: string,
        doi: string,
        api_token: string | null,
        BACKEND_URL: string
    }) {

    if (!BACKEND_URL.endsWith('/')) {
        BACKEND_URL = BACKEND_URL + '/'
    }

    const url = "http://easyreview-backend:8000/api/reviews/fetch/"
    const payload = JSON.stringify(
        {
            site_url: site_url,
            doi: doi,
            api_token: api_token
        }
    )

    const res = await backendRequest(url, 'POST', payload)

    if (res.status !== 200) {
        throw new Error(await res.text())
    }

    const review: ReviewQuery = await res.json()

    return review
}