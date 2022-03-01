import React from "react";

interface Props {
    children: any;
    className?: string;
}

export default function LandingContentWrapper({ children, className }: Props) {
    return <div className={`h-screen flex flex-wrap ${className}`}>{children}</div>;
}