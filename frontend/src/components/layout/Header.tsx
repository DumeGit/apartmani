import React from "react";
import {
    Navbar,
    NavbarBrand, NavbarText,
    NavbarToggler,
} from "reactstrap";
import {HeaderAction} from "./HeaderModel";
import {LockClosedIcon} from "@heroicons/react/solid";
import AppButton from "../AppButton";

interface HeaderProps {
    actions: HeaderAction[],
    buttonTitle: string,
}

export default function Header({actions, buttonTitle}: HeaderProps) {
    return (
        <div>
            <Navbar
                color="faded"
                light
            >
                <NavbarBrand
                    className="me-auto"
                    href="/"
                >
                    <img className="h-10 w-20 rounded-full" src="https://cdn.worldvectorlogo.com/logos/rab.svg"
                         alt="lindaLogo"/>
                </NavbarBrand>

                {actions?.map((action) => (
                    <NavbarText>
                        <AppButton key={action.key} title={action.title} onClick={action.onClick} icon={action.icon}/>
                    </NavbarText>
                ))}

            </Navbar>
        </div>
    )
}