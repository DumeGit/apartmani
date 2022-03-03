import React from "react";
import AdminHeader from "./AdminHeader";
import {Redirect, useParams} from "react-router-dom";
import AdminReservations from "../reservations/AdminReservations";
import AdminAcceptedReservations from "../reservations/accepted/AdminAcceptedReservations";

export default function AdminHomePage() {

    const { content, id } : any = useParams();

    const contents: string[] = ["home", "reservations"]

    return (
        <>
            <AdminHeader/>
            {content === "home" && <AdminReservations/>}
            {content === "reservations" && <AdminAcceptedReservations/>}
            {contents.indexOf(content) === -1 && <Redirect from="*" to="/admin/reservations"/> }
        </>
    )
}