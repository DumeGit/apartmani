import React from "react";

interface ButtonProps{
    onClick: any
    icon: JSX.Element
    title: string,
}

export default function AppButton( {onClick, icon, title} : ButtonProps) {
    return(
        <button
            onClick={onClick}
            className="group relative w-full flex justify-center py-2 px-10 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {icon}
                </span>
            {title}
        </button>
    )
}