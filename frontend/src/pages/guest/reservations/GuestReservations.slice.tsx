import * as api from "../../../api/reservations";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Reservation from "../../../models/Reservation";

type Status = "idle" | "waiting" | "success" | "error"

const getGuestReservations = createAsyncThunk("guestReservations/getAllReservations",
    async () => api.getGuestReservations());

const initialState = {
    result: {
        reservations:  [] as Reservation[]
    },
    status : {
        reservationsStatus: "idle" as Status
    }
}

const GuestReservationsSlice = createSlice({
    initialState,
    name: "guestReservations",
    reducers: {},
    extraReducers: (builder) => {
    builder.addCase(getGuestReservations.pending, (state) => {
        state.result.reservations = initialState.result.reservations;
        state.status.reservationsStatus = "waiting";
    });

    builder.addCase(getGuestReservations.rejected, (state) => {
        state.status.reservationsStatus = "error";
    });

    builder.addCase(getGuestReservations.fulfilled, (state, action) => {
        state.status.reservationsStatus = "success";
        state.result.reservations = action.payload;
    });
    }

});

export const guestReservations = GuestReservationsSlice.reducer;
export const actions = {
    getGuestReservations: getGuestReservations,
}