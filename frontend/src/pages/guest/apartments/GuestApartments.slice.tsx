import * as api from "../../../api/apartments";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Apartment} from "../../../models/Apartment";

type Status = "idle" | "waiting" | "success" | "error"

const getAllApartments = createAsyncThunk("guestApartments/getAllApartments",
    async () => api.getAllApartments());

const initialState = {
    result: {
        apartments:  [] as Apartment[]
    },
    status : {
        apartmentsStatus: "idle" as Status
    }
}

const GuestApartmentsSlice = createSlice({
    initialState,
    name: "guestApartments",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllApartments.pending, (state) => {
            state.result.apartments = initialState.result.apartments;
            state.status.apartmentsStatus = "waiting";
        });

        builder.addCase(getAllApartments.rejected, (state) => {
            state.status.apartmentsStatus = "error";
        });

        builder.addCase(getAllApartments.fulfilled, (state, action) => {
            state.status.apartmentsStatus = "success";
            state.result.apartments = action.payload;
        });
    }

});

export const guestApartments = GuestApartmentsSlice.reducer;
export const actions = {
    getAllApartments: getAllApartments,
}