import Accordion from "@/app/components/accordion"
import Chat from "@/app/components/chat"
import Details from "@/app/components/details"
import Metadatablock from "@/app/components/metadatablock"
import Statistics from "@/app/components/statistics"
import Suggest from "@/app/components/suggest"
import { Dataset, Field } from "@/app/types"
import { fetchFieldData } from "@/app/utils/loader"

const BACKEND_URL = 'http://easyreview-backend:8000/api/field/'

export default async function Review(
    {
        params,
        searchParams,
    }: {
        params: { id: string },
        searchParams: { field_id?: string, function?: string }
    }) {


    // Get the dataset
    const res = await fetch(
        `http://easyreview-backend:8000/api/reviews/${params.id}/`,
        {
            method: "GET",
            next: {
                revalidate: 0
            }
        }
    )

    const dataset: Dataset = await res.json()

    let field: Field | null = null

    // If a field_id is provided, set it in the store
    if ("field_id" in searchParams) {
        field = await fetchFieldData(
            searchParams.field_id, BACKEND_URL
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
                <div className="fixed h-screen">
                    <div className="flex flex-col mr-28 w-96 gap-y-8">
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