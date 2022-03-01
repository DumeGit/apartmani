import React from "react";

export function RequiredInputLabel(props: { label: string }) {
    return (
        <div>
            {props.label}
            <span className="text-red-600 ml-0.5">*</span>
        </div>
    );
}