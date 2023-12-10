"use client";

import { cleanAndCapitalize } from "../utils/stringfuns"
import { Field as FieldType } from "../types"
import { stripHtml } from "string-strip-html";
import { useState } from "react";
import FieldWrapper from "./fieldwrapper";
import { FaXmark, FaCheck, FaExclamation } from "react-icons/fa6";

export default function Primitive(
    {
        field,
        datasetId,
        isCompound = false,
    }: {
        field: FieldType,
        datasetId: string,
        isCompound?: boolean,
    }
) {

    if (typeof field.value === 'string') {
        field.value = stripHtml(field.value).result
    }

    // States
    const [accepted, setAccepted] = useState<boolean>(field.accepted)
    const [hover, setHover] = useState<boolean>(false)

    // Handler
    const onMouseOver = () => setHover(true)
    const onMouseOut = () => setHover(false)

    // Functions
    const shortenLongString = (str: string, maxLen: number) => {
        if (typeof str !== 'string') return str;
        if (str.length <= maxLen) return str;
        return str.substring(0, maxLen) + '...';
    }

    // Review decision
    let decision = "border-l-2 border-transparent"
    let symbol = <div className="px-1 mt-1 text-xs text-warning"><FaExclamation /></div>

    if (accepted === true) {
        decision = ""
        symbol = <div className="px-1 mt-1 text-xs opacity-100 text-success"><FaCheck /></div>
    } else if (accepted === false) {
        decision = "border-l border-error"
        symbol = <div className="px-1 mt-1 text-xs text-error"><FaXmark /></div>
    } else {
        decision = "border-l border-warning"
    }

    const hasSuggestions = Object.keys(field.history).length > 1
    const suggestStyle = "italic tooltip tooltip-bottom"

    if (field.name === "text") {
        isCompound = false
    }

    return (
        <FieldWrapper
            field={field}
            setAccepted={setAccepted}
            datasetId={datasetId}
        >
            <div
                id={field.id}
                className={
                    `flex flex-col flex-start break-word justify-start pl-2 mb-2 ${decision}`
                }
            >
                <div className="flex flex-row items-center">
                    <h2 className="mt-2 mb-1 text-xs opacity-40">{cleanAndCapitalize(field.name)}</h2>
                    {symbol}
                </div>
                <div
                    className={
                        `${hasSuggestions ? suggestStyle : ""} font-light text-sm break-words leading-7 text-justify text-ellipsis`}
                    data-tip={hasSuggestions ? "This is a suggestion" : ""}
                    onMouseEnter={onMouseOver}
                    onMouseLeave={onMouseOut}
                >
                    {hover === false && isCompound === true ? shortenLongString(field.value, 50) : field.value}
                </div>
            </div>
        </FieldWrapper >
    )
}