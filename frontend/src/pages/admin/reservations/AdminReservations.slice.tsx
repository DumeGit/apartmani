import * as api from "../../../api/reservations";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Reservation from "../../../models/Reservation";

type Status = "idle" | "waiting" | "success" | "error"

const getAllReservations = createAsyncThunk("adminReservations/getAllReservations",
    async () => api.getAllReservations());

const initialState = {
    result: {
        reservations:  [] as Reservation[]
    },
    status : {
        reservationsStatus: "idle" as Status
    }
}

const AdminReservationsSlice = createSlice({
    initialState,
    name: "adminReservations",
    reducers: {},
    extraReducers: (builder) => {
    builder.addCase(getAllReservations.pending, (state) => {
        state.result.reservations = initialState.result.reservations;
        state.status.reservationsStatus = "waiting";
    });

    builder.addCase(getAllReservations.rejected, (state) => {
        state.status.reservationsStatus = "error";
    });

    builder.addCase(getAllReservations.fulfilled, (state, action) => {
        state.status.reservationsStatus = "success";
        state.result.reservations = action.payload;
    });
    }

});

export const adminReservations = AdminReservationsSlice.reducer;
export const actions = {
    getAllReservations: getAllReservations,
}