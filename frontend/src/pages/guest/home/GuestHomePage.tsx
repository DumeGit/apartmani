import React from "react";
import GuestHeader from "./GuestHeader";
import {Redirect, useParams} from "react-router-dom";
import GuestApartments from "../apartments/GuestApartments";
import GuestApartmentsDetails from "../apartments/details/GuestApartmentsDetails";
import GuestReservations from "../reservations/GuestReservations";

export default function GuestHomePage() {

    const { content, id } : any = useParams();

    const contents: string[] = ["home", "reservations"];

    return (
        <>
            <GuestHeader/>
            <div >
                {content === "home" && !id && <GuestApartments/>}
                {content === "home" && id && <GuestApartmentsDetails id={id}/>}
                {content === "reservations" && <GuestReservations />}
                {contents.indexOf(content) === -1 && <Redirect from="*" to="/guest/home"/> }
            </div>
        </>
    )
}