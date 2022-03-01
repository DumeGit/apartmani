import React from "react";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from "./api/auth";
import {AppUser} from "./models/AppUser";

type Status = "idle" | "waiting" | "success" | "error";

const getCurrentUser = createAsyncThunk("app/getCurrentUser", api.getCurrentUser);

const initialState = {
    currentUser: {} as AppUser,
    status: "idle" as Status,
};

const appSlice = createSlice({
    initialState,
    name: "app",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.pending, (state) => {
            state.currentUser = initialState.currentUser;
            state.status = "waiting";
        });

        builder.addCase(getCurrentUser.rejected, (state) => {
            state.status = "error";
        });

        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.status = "success";
            state.currentUser = action.payload;
        });
    },
});

export const app = appSlice.reducer;
export const actions = {
    getCurrentUser: getCurrentUser,
};