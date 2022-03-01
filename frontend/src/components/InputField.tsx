import {RequiredInputLabel} from "./RequiredInputLabel";
import {ErrorMessage, Field} from "formik";
import React from "react";

interface InputFieldProps{
    name: string,
    touched: any,
    errors: any,
    type: string,
    label: string,
}

export default function InputField({name, touched, errors, type, label} : InputFieldProps) {
    return (
        <div>
            <RequiredInputLabel label={label}/>
            <Field key={name} name={name} type={type}
                   className={`mt-2 form-control ${touched && errors ? "is-invalid" : ""}`}/>
            <ErrorMessage
                component="div"
                name={name}
                className="invalid-feedback"
            />
        </div>
    )
}
