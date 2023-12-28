"use client";

import { Compound as CompoundType, Field as FieldType } from "../../../types";
import { cleanAndCapitalize } from "../../../utils/stringfuns";
import Divider from "./divider";
import Primitive from "./primitive";

export default function Compound(
    {
        compound,
        datasetId
    }: {
        compound: CompoundType,
        datasetId: string
    }
) {

    const cleanedName = cleanAndCapitalize(compound.name)
    const hasMoreThanOnePrimitive = compound.primitives.length > 1

    return (
        <div className="flex flex-col flex-start">
            <p className="col-span-3 mt-3 mb-3 ml-2 ">{cleanedName}</p>
            <div
                className={`grid ${hasMoreThanOnePrimitive ? "grid-cols-2" : ""} col-span-9`}>
                {
                    compound.primitives.map(
                        (field) => (
                            <Primitive field={field} datasetId={datasetId} isCompound={true} />
                        ))
                }
            </div>
            <Divider />
        </div>
    )
}