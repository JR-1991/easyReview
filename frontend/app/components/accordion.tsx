"use client";

import { capitalizeFirstLetter } from "../utils/stringfuns";
import { VscSymbolField } from "react-icons/vsc";
import cardStyle from "../utils/styles";

export default function Accordion({ name, children }: { name: string, children: React.ReactNode }) {
    return (
        <div className={cardStyle.replace("shadow-md", " ") + "mb-4 px-2 bg-white collapse-arrow collapse"}>
            <input type="checkbox" />
            <div className="flex flex-row text-xl font-medium align-middle collapse-title">
                <div className="flex pt-1 pr-3 align-middle">
                    <VscSymbolField />
                </div>
                {capitalizeFirstLetter(name)}
            </div>
            <div className="collapse-content">
                {children}
            </div>
        </div>
    )
}