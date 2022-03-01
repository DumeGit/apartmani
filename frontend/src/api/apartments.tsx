import {Apartment} from "../models/Apartment";
import {ApartmentWithDates} from "../models/ApartmentWithDates";

export async function getAllApartments() : Promise<Apartment[]> {

    const response = await fetch("http://localhost:8888/apartment/search", {credentials: "include"});
    console.log(response);
    return response.json();

}

export async function getOneById(id:number) : Promise<ApartmentWithDates> {
    const data = {
        id: id
    }
    const response = await fetch("http://localhost:8888/apartment/getOne", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),


    });
    console.log(response);
    return response.json();

}