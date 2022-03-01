import React from "react";
import ApartmentDetails from "../../../../components/details/ApartmentDetails";

interface GuestApartmentsDetailsProps {
    id: number;
}

export default function GuestApartmentsDetails(props: GuestApartmentsDetailsProps) {

    return (
                <ApartmentDetails id={props.id}/>
    )
}