import React, {useContext, useState} from "react";
import {UserLogin} from "../models/UserLogin";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {actions} from "../App.slice";
import {
    Alert,
    Button,
    Card,
    CardBody,
    CardFooter,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader
} from "reactstrap";
import {AlertContext} from "../util/AlertContext";
import {Form, Formik, Field} from "formik";
import GuestLogin from "../pages/guest/login/GuestLogin";
import GuestRegistration from "../pages/guest/login/GuestRegistration";

interface LoginFormProps {
    apiCall: (data: UserLogin) => Promise<Response>;
    historyPush: string;
    child?: any,
    register: boolean,
}

export const LoginForm = ({apiCall, historyPush, child, register}: LoginFormProps) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loginData, setLoginData] = useState<UserLogin>({email: "", password: ""} as UserLogin);

    const [modal, setModal] = useState<boolean>(false);
    const toggle = () => {
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        }
    }

    const alert = useContext(AlertContext);

    const onSubmit = async (values: UserLogin) => {
        setLoginData(values);
        try {
            await apiCall(values);
            dispatch(actions.getCurrentUser());
            history.push(historyPush)
        } catch (error) {
            alert.handleOpen("Failed to login")
        }
    };

    return (
        <div className="mt-3">
            <Card>
                <CardBody>
                    <Formik initialValues={loginData} onSubmit={onSubmit}>
                        {() => {
                            return (
                                <Form>
                                    <div className="text-left ">
                                        <label>E-mail</label>
                                        <Field name = "email" type = "email" className = "form-control"/>
                                        <label>Password</label>
                                        <Field name = "password" type = "password" className = "form-control"/>
                                    </div>
                                    <div className="flex flex-row justify-center pr-3 pl-3 mt-3 w-full">
                                        <button className="group relative w-full flex justify-center py-2 px-10 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">
                                            Login
                                        </button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </CardBody>
                {register ?
                    <CardFooter className="text-center">
                        <div >
                            <h3 className="hover:text-indigo-700 cursor-pointer" onClick={toggle}>
                            Register!
                            </h3>
                        </div>
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle}>Guest registration</ModalHeader>
                            <ModalBody>
                                <GuestRegistration/>
                            </ModalBody>
                        </Modal>
                    </CardFooter>
                : null}
            </Card>
            {child}
        </div>
    );
}