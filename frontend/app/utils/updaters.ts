const BACKEND_URL = 'http://localhost:8000/api/field/update/'


export async function updateField(payload: Object, field_id: string) {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };
    fetch(`${BACKEND_URL}${field_id}/`, requestOptions)
}