import Accordion from "@/app/review/[id]/components/accordion"
import Chat from "@/app/review/[id]/components/chat"
import Details from "@/app/review/[id]/components/details"
import ErrorModal from "@/app/review/[id]/components/errormodal"
import Metadatablock from "@/app/review/[id]/components/metadatablock"
import Statistics from "@/app/review/[id]/components/statistics"
import Suggest from "@/app/review/[id]/components/suggest"
import { Dataset, Field } from "@/app/types"
import { fetchFieldData } from "@/app/utils/loader"
import backendRequest from "@/app/utils/requests"

interface ErrorResponse {
    detail: string
}

export default async function Review(
    {
        params,
        searchParams,
    }: {
        params: { id: string },
        searchParams: { field_id?: string, function?: string }
    }) {


    // Get the dataset
    const url = `http://easyreview-backend:8000/api/reviews/${params.id}`
    const res = await backendRequest(url, "GET")
    const dataset: Dataset | ErrorResponse = await res.json()

    if ("detail" in dataset) {
        const message = `The review of id ${params.id} could not be found. Please check the URL.`
        return (
            <div className="flex flex-row justify-center w-full">
                <ErrorModal error={message} />
            </div>
        )
    }

    let field: Field | null = null

    // If a field_id is provided, set it in the store
    if ("field_id" in searchParams) {
        const fieldURL = `http://easyreview-backend:8000/api/fields/`
        field = await fetchFieldData(
            // @ts-ignore
            searchParams.field_id, fieldURL
        )
    }

    return (
        <div className="grid grid-cols-12 gap-5">
            <div className="flex flex-col col-span-8 px-2 no-scrollbar gap-y-1">
                {dataset.metadatablocks.map((metadatablock) => {

                    if (metadatablock.primitives.length === 0 && metadatablock.compounds.length === 0) {
                        return null
                    }

                    return <Accordion name={metadatablock.name}>
                        <Metadatablock metadatablock={metadatablock} datasetId={dataset.id} />
                    </Accordion>
                })}
            </div>
            <div className="col-span-2">
                <div className="fixed h-screen md:w-full sm:w-auto">
                    <div className="flex flex-col md:w-auto md:max-w-lg sm:w-3/4 sm:max-w-sm gap-y-5">
                        <Statistics
                            reviewId={params.id}
                            site_url={dataset.site_url}
                            doi={dataset.doi}
                            datasetId={dataset.id}
                        />
                        {field === null ? null : <Details field={field} />}
                        <div className="shadow-l card ">
                            {searchParams.function === "suggest" ? <Suggest field={field} /> : null}
                            {searchParams.function === "chat" ? <Chat /> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}