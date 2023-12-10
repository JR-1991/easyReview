"use client";

import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import useReviewStore from "../stores/reviewstore";
import { fetchProgress } from "../utils/statsloder";
import cardStyle from "../utils/styles";


export default function Statistics(
    {
        reviewId,
        datasetId,
        doi,
        site_url
    }: {
        reviewId: string,
        datasetId: string,
        doi: string,
        site_url: string
    }
) {

    // Functions
    const encryptData = (id: string) => {
        let token = CryptoJS.AES.encrypt(
            id,
            "XkhZG4fW2t2W"
        ).toString()

        let cleanedToken = token.replace(/\+/g, 'xMl3Jk').replace('/', 'Por21Ld').replace('=', 'Ml32');

        return cleanedToken;
    };

    const constructShareLink = () => {
        const url = window.location.origin
        return url + "/?token=" + encryptData(reviewId)
    }

    // States
    const progress = useReviewStore((state) => state.progress)

    // Actions
    const updateProgress = useReviewStore((state) => state.updateProgress)

    // Effects
    useEffect(() => {
        fetchProgress(datasetId).then((progress) => updateProgress(progress))
    }, [])

    // Handlers
    const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.select()
    }

    // Variables
    const isComplete = progress >= 100

    return (
        <div className={cardStyle + "stats stats-vertical"}>
            <div className="flex justify-center mx-1 mt-3 scale-x-90 scale-y-75 bg-white border-transparent ">
                <progress
                    className={`bg-white progress border-transparent ${isComplete ? "progress-success" : "progress-warning"}`}
                    value={progress}
                    max={100}
                />
            </div>
            <div className="border border-t-transparent stat border-slate-500/50">
                <div className="stat-desc">
                    <a href={site_url} target="_blank">
                        {site_url}
                    </a>
                </div>
                <div className="text-lg stat-value">
                    <a href={`${site_url}dataset.xhtml?persistentId=${doi}`} target="_blank">
                        {doi.replace("doi:", "")}
                    </a>
                </div>
                <div className="flex flex-row justify-start my-4">
                    <div className="w-full form-control">
                        <input
                            type="text"
                            placeholder="Type here"
                            className="w-full input input-bordered input-xs"
                            value={constructShareLink()}
                            onFocus={(e) => handleFocus(e)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}