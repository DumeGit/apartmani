import {combineReducers} from '@reduxjs/toolkit';
import {app} from "../App.slice";
import {adminReservations} from "../pages/admin/reservations/AdminReservations.slice";
import {guestApartments} from "../pages/guest/apartments/GuestApartments.slice";
import {guestApartmentsDetails} from "../pages/guest/apartments/details/GuestApartmentsDetails.slice";
import {guestReservations} from "../pages/guest/reservations/GuestReservations.slice";

export const rootReducer = combineReducers({
    app,
    adminReservations,
    guestApartments,
    guestApartmentsDetails,
    guestReservations,
});

export type RootState = ReturnType<typeof rootReducer>
