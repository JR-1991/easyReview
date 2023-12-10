"use client";

import { VscEye } from "react-icons/vsc";

export default function Header() {
    return (
        <header className="top-0 flex flex-row justify-between h-16 bg-opacity-0 navbar">
            <div className="flex flex-row place-content-between">
                <div className="flex items-center gap-2">
                    <VscEye className="scale-[1.9] rotate-90  fill-teal-600" />
                    <a className="text-xl font-semibold normal-case">EasyReview</a>
                </div>
            </div>
        </header>
    )
}