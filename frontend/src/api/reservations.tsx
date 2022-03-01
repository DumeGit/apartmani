import Reservation from "../models/Reservation";
import {SubmitReservation} from "../models/SubmitReservation";
import {APIError} from "../models/APIError";
import {AppError} from "../models/AppError";
import {AcceptOrDeny} from "../models/AcceptOrDeny";

export async function getAllReservations() : Promise<Reservation[]> {

    const response = await fetch("http://localhost:8888/reservation/search", {credentials: "include"});
    return response.json();

}

export async function getGuestReservations() : Promise<Reservation[]> {

    const response = await fetch("http://localhost:8888/reservation/searchByGuest", {credentials: "include"});
    return response.json();

}

export async function reserve(data: SubmitReservation) : Promise<void> {
    const postData: RequestInit = {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }
    const response = await fetch("http://localhost:8888/reservation/create", postData);

    if(response.status !== 200) {
        const errors: APIError[] = (await response.json()).errors as APIError[];
        throw new AppError(errors);
    }
}

export async function deny(reservationId: AcceptOrDeny) : Promise<void> {
    const postData: RequestInit = {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationId),
    }

    const response = await fetch("http://localhost:8888/reservation/deny", postData)
    if(response.status !== 200) {
        const errors: APIError[] = (await response.json()).errors as APIError[];
        throw new AppError(errors);
    }
}

export async function accept(reservationId: AcceptOrDeny) : Promise<void> {
    const postData: RequestInit = {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationId),
    }

    const response = await fetch("http://localhost:8888/reservation/accept", postData)
    if(response.status !== 200) {
        const errors: APIError[] = (await response.json()).errors as APIError[];
        throw new AppError(errors);
    }
}