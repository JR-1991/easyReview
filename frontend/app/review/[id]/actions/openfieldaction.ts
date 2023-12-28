"use server";

import backendRequest from "@/app/utils/requests";

export async function openFieldsAction(review_id: string): Promise<void> {
    const url = `http://easyreview-backend:8000/api/reviews/${review_id}/open/`
    const response = await backendRequest(url, 'GET')

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    return await response.json()
}