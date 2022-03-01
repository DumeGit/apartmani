import React from "react";
import {RegisterForm} from "../../../components/RegisterForm";
import * as api from "../../../api/auth"

export default function GuestRegistration() {
    return(
        <RegisterForm apiCall={api.guestRegister} />
    )
}