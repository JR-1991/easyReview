export interface ReviewQuery {
    message: string,
    review_id: string,
}

export async function fetchFieldData(id: string, BACKEND_URL: string) {
    // Function to fetch specific field data from the backend

    if (!BACKEND_URL.endsWith('/')) {
        BACKEND_URL = BACKEND_URL + '/'
    }

    const res = await fetch(`${BACKEND_URL}${id}/`)
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


    const res = await fetch(
        "http://easyreviw-backend:8000/api/dataset/fetch/",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    site_url: site_url,
                    doi: doi,
                    api_token: api_token
                }
            ),
            next: {
                revalidate: 0
            }
        });

    if (res.status !== 200) {
        throw new Error(await res.text())
    }

    const review: ReviewQuery = await res.json()

    return review
}