import React, { useState, useContext, createContext } from 'react'
import {Alert} from "reactstrap";

interface AlertProviderProps{
    children: React.ReactNode,
}

export const AlertContext = createContext({
    handleOpen: (message:string) => {},
    handleClose: () => {}
    }
);

export function AlertProvider({ children } : AlertProviderProps) {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState<string>()


    const handleClose = (() => {
        setOpen(false)
    })

    const handleOpen = ((message:string) => {
        setMessage(message)
        setOpen(true)
    })

    return (
        <AlertContext.Provider value={{handleOpen, handleClose}}>
            {children}
            <Alert color="info" isOpen={open} toggle={handleClose} >
                {message}
            </Alert>
        </AlertContext.Provider>
    )
}


export function useAlert() {
    const context = useContext(AlertContext);
    if (!context)
        throw new Error('`useAlert()` must be called inside an `AlertProvider` child.')

    return context
}