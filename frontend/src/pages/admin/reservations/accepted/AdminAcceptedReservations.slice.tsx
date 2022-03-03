import * as api from "../../../../api/reservations";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Reservation from "../../../../models/Reservation";

type Status = "idle" | "waiting" | "success" | "error"

const getAllAcceptedReservations = createAsyncThunk("adminReservations/getAllReservations",
    async () => api.getAllAcceptedReservations());

const initialState = {
    result: {
        reservations:  [] as Reservation[]
    },
    status : {
        reservationsStatus: "idle" as Status
    }
}

const AdminAcceptedReservationsSlice = createSlice({
    initialState,
    name: "adminReservations",
    reducers: {},
    extraReducers: (builder) => {
    builder.addCase(getAllAcceptedReservations.pending, (state) => {
        state.result.reservations = initialState.result.reservations;
        state.status.reservationsStatus = "waiting";
    });

    builder.addCase(getAllAcceptedReservations.rejected, (state) => {
        state.status.reservationsStatus = "error";
    });

    builder.addCase(getAllAcceptedReservations.fulfilled, (state, action) => {
        state.status.reservationsStatus = "success";
        state.result.reservations = action.payload;
    });
    }

});

export const adminAcceptedReservations = AdminAcceptedReservationsSlice.reducer;
export const actions = {
    getAllAcceptedReservations: getAllAcceptedReservations,
}