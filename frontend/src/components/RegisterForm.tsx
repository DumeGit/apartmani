import React, { useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {actions} from "../App.slice";
import {
    Alert,
    Card,
    CardBody,
} from "reactstrap";
import {Form, Formik} from "formik";
import UserRegister from "../models/UserRegister";
import * as Yup from "yup";
import InputField from "./InputField";

interface RegisterFormProps {
    apiCall: (data: UserRegister) => Promise<void>;
    child?: any,
}

export const RegisterForm = ({apiCall, child}: RegisterFormProps) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [registerData, setRegisterData] = useState<UserRegister>({email: "", password: "", firstName: "", lastName: "", confirmPassword: ""} as UserRegister);

    const [modal, setModal] = useState<boolean>(false);
    const [alertText, setAlertText] = useState<string>("");
    const [alertColor, setAlertColor] = useState<string>("");


    const onSubmit = async (values: UserRegister) => {
        setRegisterData(values);
        try {
            await apiCall(values);
            dispatch(actions.getCurrentUser());
            setAlertText("Successful registration")
            setAlertColor("primary");
            setModal(true);
        } catch (error) {
            setAlertText("E-mail already exists");
            setAlertColor("danger");
            setModal(true);
        }

    };

    const ValidationSchema = Yup.object().shape({
        email: Yup.string().email("Email address must be valid").required("Field is required"),
        firstName: Yup.string().required("Field is required"),
        lastName: Yup.string().required("Field is required"),
        password: Yup.string().min(8, "Length must be at least 8").required("Field is required"),
        confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required()
    });

    return (
        <div className="mt-3">
            <Card>
                <CardBody>
                    <Formik initialValues={registerData} onSubmit={onSubmit} validationSchema={ValidationSchema}>
                        {({touched, errors, isSubmitting, values}) => {
                            return (
                                <Form >
                                    <div className="text-left ">
                                        <InputField name="email" touched={touched.email} errors={errors.email} type="email" label="E-mail"/>
                                        <InputField name="firstName" touched={touched.firstName} errors={errors.firstName} type="string" label="First name"/>
                                        <InputField name="lastName" touched={touched.lastName} errors={errors.lastName} type="string" label="Last name"/>
                                        <InputField name="password" touched={touched.password} errors={errors.password} type="password" label="Password"/>
                                        <InputField name="confirmPassword" touched={touched.confirmPassword} errors={errors.confirmPassword} type="password" label="Confirm password"/>
                                    </div>
                                    <div className="flex flex-row justify-center pr-3 pl-3 mt-3 w-full">
                                        <button disabled={!ValidationSchema.isValidSync(values)} className="disabled:bg-indigo-200 group relative w-full flex justify-center py-2 px-10 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">
                                            Register
                                        </button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </CardBody>
            </Card>
            {child}
            <Alert isOpen={modal} color={alertColor} >
                {alertText}
            </Alert>
        </div>
    );
}