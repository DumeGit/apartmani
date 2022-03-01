import React, {useState} from "react";
import LandingHeader from "./LandingHeader";
import {
    Button,
    Card,
    CardBody, CardColumns, CardFooter, CardGroup, CardHeader,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Carousel,
    CarouselIndicators,
    CarouselItem, Modal, ModalBody, ModalHeader
} from "reactstrap";
import {Slide} from 'react-slideshow-image';
import "../../resources/styles/slideStyle.css"
import AdminLogin from "../admin/login/AdminLogin";
import GuestLogin from "../guest/login/GuestLogin";
import {LockClosedIcon, UserIcon} from "@heroicons/react/solid";
import AppButton from "../../components/AppButton";

export default function LandingPage() {
    const slideImages = [
        'https://www.rab-visit.com/objekti_slike/260/carousel/19102017010153_20170605_203644_resized.jpg?width=720&height=425',
        'https://www.rab-visit.com/objekti_slike/260/carousel/30092014123038_DSC_7035m.jpg?width=720&height=425',
        'https://www.rab-visit.com/objekti_slike/260/carousel/30092014123030_1.jpg?width=720&height=425'
    ];

    const [modal, setModal] = useState<boolean>(false);
    const toggle = () => {
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        }
    }
    return (
        <>
            <LandingHeader/>
            <Card className="flex p-5 bg-dark bg-opacity-10 h-screen">
                <CardGroup className="flex flex-row justify-content-between ">
                    <Card className="p-5">
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
                        <CardBody>
                            <CardTitle tag="h5">
                                Apartman Luka
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                            </CardSubtitle>
                            <CardText>
                            </CardText>
                        </CardBody>
                    </Card>
                    <Card className="p-5">
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
                        <CardBody>
                            <CardTitle tag="h5">
                                Apartman Linda
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                            </CardSubtitle>
                            <CardText>
                            </CardText>
                        </CardBody>
                    </Card>
                </CardGroup>
                <CardFooter className="flex justify-content-center align-items-center">
                    <AppButton title="Sign in" onClick={toggle} icon={<UserIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>}/>

                </CardFooter>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Sign in!</ModalHeader>
                    <ModalBody>
                        <GuestLogin/>
                    </ModalBody>
                </Modal>
            </Card>
        </>
    )
}