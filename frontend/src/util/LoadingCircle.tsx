import React from "react";
import "../resources/styles/customStyle.css";

import {RefreshIcon} from "@heroicons/react/solid";
import {Spinner} from "reactstrap";

export type Status = "idle" | "waiting" | "success" | "error";

interface LoadingCircleProps {
    status: Status;
    children: any;
}

export const LoadingCircle = ({ status, children }: LoadingCircleProps) => {
    if (status === "waiting") {
        return (
            <div className="flex flex-row justify-center mt-10 mb-10">
                <Spinner>Loading...</Spinner>
            </div>
        );
    } else if (status === "idle") {
        return null;
    }
    return children;
};