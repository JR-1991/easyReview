interface PayloadType {
    method: string,
    headers: Headers,
    body?: string,
    next: {
        revalidate: number
    }
}

async function backendRequest(path: string, method: string, body: string | null = null): Promise<Response> {

    // Retrieve the Django superuser credentials from the environment variables
    const DJANGO_SUPERUSER_USERNAME = process.env.NEXT_PUBLIC_DJANGO_SUPERUSER_USERNAME
    const DJANGO_SUPERUSER_PASSWORD = process.env.NEXT_PUBLIC_DJANGO_SUPERUSER_PASSWORD

    // Authenticate
    const header = new Headers()
    header.append(
        'Accept',
        'application/json'
    )
    header.append(
        'Authorization',
        'Basic ' + btoa(DJANGO_SUPERUSER_USERNAME + ":" + DJANGO_SUPERUSER_PASSWORD
        )
    )


    // Set up payload
    let payload: PayloadType = {
        method: method,
        headers: header,
        next: {
            revalidate: 0
        }

    }

    if (body) {
        header.append(
            'Content-Type',
            'application/json'
        )
        payload.body = body
    }

    return fetch(
        path,
        payload,
    )
}

export default backendRequest