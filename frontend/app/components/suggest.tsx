"use client";

import { useState } from "react";
import { Field } from "../types";
import { updateField } from "../utils/updaters";
import moment from 'moment'
import { usePathname, useRouter } from "next/navigation";
import cardStyle from "../utils/styles";


export default function Suggest(
    {
        field
    }: {
        field: Field | null
    }) {

    if (field === null) return null

    // States
    const [changes, setChanges] = useState<string>("")

    // Router
    const router = useRouter()
    const path = usePathname()

    // Event handlers
    const handleSubmit = () => {
        const currentTime = new Date()
        const payload = {
            value: changes,
            history: { ...field.history, [moment(currentTime).format("LLL")]: changes }
        }

        updateField(payload, field.id)
        router.refresh()
    }

    return (
        <div className={cardStyle + "flex flex-col overflow-auto break-words bg-white rounded-xl stat"}>
            <div className="text-lg stat-value">Suggest</div>
            <p className="mb-5 text-xs text-gray-400">Within this field you are able suggest changes to a field. Changes made will be documented and are revertible.</p>
            <div className="flex flex-col gap-4">
                <textarea
                    className="textarea textarea-bordered"
                    placeholder={field.value}
                    onChange={(e) => setChanges(e.target.value)}
                />
                <button className=" btn btn-xs" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}