import backendRequest from "./requests"

export async function updateField(payload: Object, field_id: string) {
    const DJANGO_HOST = process.env.NEXT_PUBLIC_DJANGO_HOST
    const DJANGO_PORT = process.env.NEXT_PUBLIC_DJANGO_PORT
    const BACKEND_URL = `http://${DJANGO_HOST}:${DJANGO_PORT}`


    const url = `${BACKEND_URL}/api/fields/${field_id}`
    const res = await backendRequest(url, 'PATCH', JSON.stringify(payload))

    // Throw error if response is not ok
    if (!res.ok) {
        throw new Error(res.statusText)
    }
}