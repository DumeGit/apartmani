import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import * as api from "../../../../api/apartments";

import {ApartmentWithDates} from "../../../../models/ApartmentWithDates";

type Status = "idle" | "waiting" | "success" | "error";

const getOneById = createAsyncThunk("guestApartmentsDetailsPage/getOne", async (id: number) => api.getOneById(id));

const initialState = {
    result: {} as ApartmentWithDates,
    status: "idle" as Status
};

const guestApartmentsDetailsPageSlice = createSlice({
    initialState,
    name: "guestApartmentsDetails",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOneById.pending, (state) => {
            state.result = initialState.result;
            state.status = "waiting";
        });

        builder.addCase(getOneById.rejected, (state) => {
            state.status = "error";
        });

        builder.addCase(getOneById.fulfilled, (state, action) => {
            state.result = action.payload;
            state.status = "success";
        });
    },
});

export const guestApartmentsDetails = guestApartmentsDetailsPageSlice.reducer;
export const actions = {
    getOneById: getOneById,
};