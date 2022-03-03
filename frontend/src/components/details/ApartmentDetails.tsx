import React, {useEffect, useState} from "react";
import {
    Alert,
    Card,
    CardBody,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText
} from "reactstrap";
import { DateRangePicker } from 'react-date-range';

import { addDays, parseISO, parse } from 'date-fns';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/reducer";
import * as api from "../../api/reservations"
import {LoadingCircle} from "../../util/LoadingCircle";
import {actions} from "../../pages/guest/apartments/details/GuestApartmentsDetails.slice";
import AppButton from "../AppButton";
import {CalendarIcon} from "@heroicons/react/solid";

interface ApartmentDetailsProps {
    id: number,
}

export default function ApartmentDetails({id} : ApartmentDetailsProps) {
    const slideshow = require('react-slideshow-image');
    const {Slide}  = slideshow;
    const {result, status} = useSelector((state: RootState) => state.guestApartmentsDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getOneById(id))
    }, [dispatch]);


    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);

    const [modal, setModal] = useState<boolean>(false);
    const [alertText, setAlertText] = useState<string>("");
    const [alertColor, setAlertColor] = useState<string>("");

    const slideImages = [
        'https://www.rab-visit.com/objekti_slike/260/carousel/19102017010153_20170605_203644_resized.jpg?width=720&height=425',
        'https://www.rab-visit.com/objekti_slike/260/carousel/30092014123038_DSC_7035m.jpg?width=720&height=425',
        'https://www.rab-visit.com/objekti_slike/260/carousel/30092014123030_1.jpg?width=720&height=425'
    ];

    const onClick = async () => {
        let data = ({
            dateFrom: state[0].startDate,
            dateTo: state[0].endDate,
            apartmentId: id
        })
        try {
            await api.reserve(data)
            setAlertText("Successful booking")
            setAlertColor("primary");
            setModal(true);
        } catch (error) {
            setAlertText(error.errors[0].message);
            setAlertColor("danger");
            setModal(true);
        }

    }


    return (
        <LoadingCircle status={status} >
        <Card className="p-20">
            <CardBody>
        <ListGroup>
            <ListGroupItem>
                <ListGroupItemHeading>
                    Apartment name
                </ListGroupItemHeading>
                <ListGroupItemText>
                    {result.name}
                </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem>
                <ListGroupItemHeading>
                    Apartment address
                </ListGroupItemHeading>
                <ListGroupItemText>
                    {result.address}
                </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem>
                <ListGroupItemHeading>
                    Apartment description
                </ListGroupItemHeading>
                <ListGroupItemText>
                    {result.description}
                </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem>
                <ListGroupItemHeading>
                    Daily cost
                </ListGroupItemHeading>
                <ListGroupItemText>
                    {result.dailyCost} $
                </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem >
                <ListGroupItemHeading>
                    Gallery
                </ListGroupItemHeading>
                <ListGroupItemText >
                    <Card>
                        <CardBody>
                        <div >
                            <Slide easing="ease">
                                <div className="each-slide-gallery flex justify-content-center align-items-center">
                                    <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
                                    </div>
                                </div>
                                <div className="each-slide-gallery flex justify-content-center align-items-center">
                                    <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
                                    </div>
                                </div>
                                <div className="each-slide-gallery flex justify-content-center align-items-center">
                                    <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
                                    </div>
                                </div>
                            </Slide>
                        </div>
                        </CardBody>
                    </Card>
            </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem color="secondary" className="flex justify-content-center align-items-center">
                <ListGroupItemHeading >
                    Make a booking!
                </ListGroupItemHeading>
                <ListGroupItemText >
                    <Card className="p-5">
                        <div>
                            {result.disabledDates?
                                <DateRangePicker
                                    // @ts-ignore
                                    onChange={(item) => setState([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    months={2}
                                    ranges={state}
                                    direction="horizontal"
                                    disabledDates={result.disabledDates.map(element => parseISO(element.toString()))}
                                />
                            : null}
                        </div>
                    </Card>

                </ListGroupItemText>
                <AppButton onClick={onClick} icon={<CalendarIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>} title="Book"/>

            </ListGroupItem>
            <Alert isOpen={modal} color={alertColor}>
                {alertText}
            </Alert>
        </ListGroup>
            </CardBody>
        </Card>
        </LoadingCircle>
    )
}