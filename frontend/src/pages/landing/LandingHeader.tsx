import React, {useState} from "react";

import { UserIcon } from "@heroicons/react/solid";

import Header from "../../components/layout/Header";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import AdminLogin from "../admin/login/AdminLogin";

export default function LandingHeader() {
    const [modal, setModal] = useState<boolean>(false);
    const toggle = () => {
        if(modal) {
            setModal(false);
        } else {
            setModal(true);
        }
    }
    return (
        <>
            <Header
                actions={[
                    {
                        key: "AdminLogin",
                        title: "Admin Login" ,
                        icon: UserIcon,
                        colorClass: "bg-indigo-600 hover:bg-indigo-700",
                        variant: "primary",
                        onClick: toggle,
                    },
                ]}
             buttonTitle="Admin login"/>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Admin login</ModalHeader>
                <ModalBody>
                    <AdminLogin/>
                </ModalBody>
            </Modal>
        </>

    );
}