"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { VscCheck, VscChromeClose, VscEdit, VscExport, VscFeedback } from "react-icons/vsc";
import { stripHtml } from "string-strip-html";
import useReviewStore from "../stores/reviewstore";
import { Field as FieldType } from "../types";
import { fetchProgress } from "../utils/statsloader";
import { updateField } from "../utils/updaters";
import Context from "./contextmenu";

export default function FieldWrapper(
    {
        children,
        field,
        setAccepted,
        isCompound = false,
        datasetId
    }: {
        children: React.ReactNode,
        field: FieldType,
        setAccepted: (accepted: boolean) => void,
        isCompound?: boolean,
        datasetId: string
    }
) {

    if (typeof field.value === 'string') {
        field.value = stripHtml(field.value).result
    }

    // States
    const [clicked, setClicked] = useState<boolean>(false)

    // Actions
    const updateProgress = useReviewStore((state) => state.updateProgress)

    // Router stuff to redirect to static page
    const router = useRouter()
    const path = usePathname()

    // Event handlers
    const handleLeftClick = () => {
        router.push(
            `${path}/?field_id=${field.id}&function=suggest`,
            { scroll: false }
        )
    }

    const handleUpdate = (decision: boolean) => {
        setAccepted(decision)
        updateField({ accepted: decision }, field.id)
        setClicked(false)
        fetchProgress(datasetId).then((progress) => updateProgress(progress))
    }

    const handleChat = () => {
        setClicked(false)
        router.push(`${path}/?field_id=${field.id}&function=chat`)
    }

    const handleSuggest = () => {
        setClicked(false)
        router.push(`${path}/?field_id=${field.id}&function=suggest`)
    }

    const handleShare = () => {
        setClicked(false)
        navigator.clipboard.writeText(`localhost:3000${path}?field_id=${field.id}`)
    }

    const menu = (
        <ul
            className={"border w-36 menu shadow-md bg-white rounded-xl"}
        >
            <li>
                <p onClick={() => { handleUpdate(true) }}>
                    <VscCheck />Accept
                </p>
            </li>
            <li>
                <p onClick={() => { handleUpdate(false) }}>
                    <VscChromeClose />Decline
                </p>
            </li>
            <hr className="my-1 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-100" />
            <li>
                <p onClick={handleChat}>
                    <VscFeedback />Chat
                </p>
            </li>
            <li>
                <p onClick={handleSuggest}>
                    <VscEdit />Suggest
                </p>
            </li>
            <li>
                <p onClick={handleShare}>
                    <VscExport />Share
                </p>
            </li>
        </ul >
    )

    return (
        <>
            <Context menu={menu}>
                <div
                    className="pr-2 transition-all duration-75 ease-out rounded-md hover:bg-base-200 "
                    onClick={handleLeftClick}
                    onContextMenu={() => { setClicked(true) }}
                >
                    {children}
                </div>
            </Context>
        </>
    )
}