import {AppUser} from "../models/AppUser";
import {UserLogin} from "../models/UserLogin";
import UserRegister from "../models/UserRegister";
import {APIError} from "../models/APIError";
import {AuthenticationError} from "../models/AuthenticationError";

function getLoginData(data: UserLogin): RequestInit {
    const params = new URLSearchParams();
    params.append("email", data.email);
    params.append("password", data.password);

    return {
        method: "POST",
        body: params,
        credentials: "include",
    };
}

export async function getCurrentUser(): Promise<AppUser> {
    const response = await fetch("http://localhost:8888/auth/user", { credentials: "include" });

    if(response.status !== 200) {
        throw new Error("Not logged in");
    }
    return response.json();
}

export async function adminLogin(data: UserLogin) : Promise<Response> {
    const response = await fetch("http://localhost:8888/auth/admin", getLoginData(data));
    if(response.status !== 200) {
        throw new Error()
    }
    return response
}

export async function guestLogin(data: UserLogin) : Promise<Response> {
    const response = await fetch("http://localhost:8888/auth/guest", getLoginData(data));
    if(response.status !== 200) {
        throw new Error()
    }
    return response
}

export async function guestRegister(data: UserRegister) : Promise<void> {
    const response = await fetch("http://localhost:8888/guest/register", {method: "POST", body: JSON.stringify(data), credentials: "include", headers: {
        "Content-Type": "application/json",
        }});
    if(response.status !== 200) {
        const error: APIError = (await response.json()).errors[0] as APIError;
        throw new AuthenticationError(error.message);
    }
}

export async function logout(): Promise<Response> {
    return await fetch("http://localhost:8888/logout", {credentials: "include"})
}