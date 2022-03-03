import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../app/reducer";
import {actions} from "./GuestApartments.slice";
import {LoadingCircle} from "../../../util/LoadingCircle";
import {formatDate} from "../../../util/util";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardGroup, CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    Modal, ModalBody,
    ModalHeader
} from "reactstrap";
import AppButton from "../../../components/AppButton";
import {UserIcon} from "@heroicons/react/solid";
import GuestLogin from "../login/GuestLogin";
import * as api from "../../../api/apartments";
import {useHistory} from "react-router-dom";

export default function GuestApartments() {
    const slideshow = require('react-slideshow-image');
    const {Slide}  = slideshow;
    const dispatch = useDispatch();
    const history = useHistory();

    const {apartments} = useSelector((state: RootState) => state.guestApartments.result);
    const {apartmentsStatus} = useSelector((state: RootState) => state.guestApartments.status);


    useEffect(() => {
        dispatch(actions.getAllApartments())
    }, [dispatch]);

    const slideImages = [
        'https://www.rab-visit.com/objekti_slike/260/carousel/19102017010153_20170605_203644_resized.jpg?width=720&height=425',
        'https://www.rab-visit.com/objekti_slike/260/carousel/30092014123038_DSC_7035m.jpg?width=720&height=425',
        'https://www.rab-visit.com/objekti_slike/260/carousel/30092014123030_1.jpg?width=720&height=425'
    ];

    return (
        <LoadingCircle status={apartmentsStatus}>
            <Card className="flex p-5 bg-dark bg-opacity-10 h-screen">
                <h2 className="bg-indigo-500 text-indigo-50 p-2 flex justify-content-center">Pick an apartment to make a reservation! </h2>
                <CardGroup className="flex flex-row justify-content-between ">
                    <Card className="cursor-pointer hover:bg-gray-200" onClick={ async () => {
                        history.push(`/guest/home/${apartments[0].id}`)
                    }}>
                        <div>
                            <Slide easing="ease">
                                <div className="each-slide">
                                    <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
                                    </div>
                                </div>
                                <div className="each-slide">
                                    <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
                                    </div>
                                </div>
                                <div className="each-slide">
                                    <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
                                    </div>
                                </div>
                            </Slide>
                        </div>
                        {apartments[0] !== undefined ?
                        <CardBody>

                                <CardTitle tag="h5">
                                    Name: {apartments[0].name}
                                </CardTitle>
                                <CardSubtitle
                                    className="mb-2 text-muted"
                                    tag="h6"
                                >
                                    Address: {apartments[0].address}
                                </CardSubtitle>
                                <CardText>
                                Description: {apartments[0].description}
                                </CardText>
                                <CardText>
                                Daily cost: {apartments[0].dailyCost} $
                                </CardText>
                                <CardText>
                                Rating: {apartments[0].averageRating}
                                </CardText>


                        </CardBody>
                            : null
                        }
                    </Card>
                    <Card className="cursor-pointer hover:bg-gray-200" onClick={ async () => {
                        history.push(`/guest/home/${apartments[1].id}`)
                    }}>
                        <div>
                            <Slide easing="ease">
                                <div className="each-slide">
                                    <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
                                    </div>
                                </div>
                                <div className="each-slide">
                                    <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
                                    </div>
                                </div>
                                <div className="each-slide">
                                    <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
                                    </div>
                                </div>
                            </Slide>
                        </div>
                        {apartments[0] !== undefined ?
                            <CardBody>
                                <CardTitle tag="h5">
                                    Name: {apartments[1].name}
                                </CardTitle>
                                <CardSubtitle
                                    className="mb-2 text-muted"
                                    tag="h6"
                                >
                                    Address: {apartments[1].address}
                                </CardSubtitle>
                                <CardText>
                                    Description: {apartments[1].description}
                                </CardText>
                                <CardText>
                                    Daily cost: {apartments[1].dailyCost} $
                                </CardText>
                                <CardText>
                                    Rating: {apartments[1].averageRating}
                                </CardText>
                            </CardBody>
                            : null
                        }
                    </Card>
                </CardGroup>
            </Card>
        </LoadingCircle>
    )
}