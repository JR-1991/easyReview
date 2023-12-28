import { Metadatablock as MetadatablockType } from "../../../types"
import Compound from "./compound"
import Divider from "./divider"
import Primitive from "./primitive"

export default function Metadatablock(
    {
        metadatablock,
        datasetId,
    }: {
        metadatablock: MetadatablockType,
        datasetId: string,
    }
) {

    return (
        <div id={metadatablock.name} className="items-center">
            {metadatablock.primitives.map((field, index) => (
                <Primitive field={field} datasetId={datasetId} />
            ))}
            {metadatablock.primitives.length > 0 ? <Divider /> : null}
            {
                metadatablock.compounds.map((compound) => (
                    <div>
                        <Compound compound={compound} datasetId={datasetId} />
                    </div>
                ))}
        </div >
    )
}