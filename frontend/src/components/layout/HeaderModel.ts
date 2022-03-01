import React from "react";

export interface HeaderAction {
    key: string;
    icon?: any;
    title: string;
    onClick: any;
    colorClass: string;
    variant: "primary" | "secondary" | "white";
}