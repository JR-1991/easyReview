"use client";

import { useRouter } from "next/navigation";
import { Dataset } from "../types";



export default function SideNav(
    {
        dataset
    }: {
        dataset: Dataset
    }
) {

    // Routing options
    const router = useRouter()
    const handleRedirect = (id: string) => {
        router.push(`/review/${dataset.id}#${id}`)
    }

    return (
        <ul className="scale-90 steps steps-vertical">
            {dataset.metadatablocks.map((metadatablock) => (
                <li className="step step-neutral">
                    <a className="step-content">
                        <span className="step-title">{metadatablock.name}</span>
                    </a>
                </li>
            ))
            }
        </ul>
    )
}