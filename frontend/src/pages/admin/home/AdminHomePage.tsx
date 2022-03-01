import React from "react";
import AdminHeader from "./AdminHeader";
import {Redirect, useParams} from "react-router-dom";
import AdminReservations from "../reservations/AdminReservations";

export default function AdminHomePage() {

    const { content, id } : any = useParams();

    const contents: string[] = ["reservations", "accept"]

    return (
        <>
            <AdminHeader/>
            <AdminReservations/>
        </>
    )
}