import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../app/reducer";
import {actions} from "./AdminReservations.slice";
import {LoadingCircle} from "../../../util/LoadingCircle";
import {formatDate} from "../../../util/util";
import {Card, CardBody} from "reactstrap";
import * as api from "../../../api/reservations"

export default function AdminReservations() {
    const dispatch = useDispatch();

    const {reservations} = useSelector((state: RootState) => state.adminReservations.result);
    const {reservationsStatus} = useSelector((state: RootState) => state.adminReservations.status);

    useEffect(() => {
        dispatch(actions.getAllReservations())
    }, [dispatch]);

    return (
        <LoadingCircle status={reservationsStatus}>
            <Card className="p-10">
                <CardBody>
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Apartment
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Period
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Accept
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Deny
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {
                                            reservations.map((reservation) => (
                                                <tr key={reservation.guestFirstName}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div
                                                                    className="text-sm font-medium text-gray-900">{reservation.guestFirstName} {reservation.guestLastName}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div
                                                            className="text-sm text-gray-900">{reservation.apartmentName}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(reservation.periodFrom.substr(0, 10))} - {formatDate(reservation.periodTo.substr(0, 10))}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <a href="#" className="text-green-600 hover:text-green-900"
                                                           onClick={async () => {
                                                               let data = ({
                                                                   reservationId: reservation.id
                                                               })
                                                               try {
                                                                   await api.accept(data);
                                                                   window.location.reload();
                                                               } catch (error) {

                                                               }
                                                           }}>
                                                            Accept
                                                        </a>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <a href="#" className="text-red-600 hover:text-red-900"
                                                           onClick={async () => {
                                                               let data = ({
                                                                   reservationId: reservation.id
                                                               })
                                                               try {
                                                                   await api.deny(data);
                                                                   window.location.reload();
                                                               } catch (error) {

                                                               }

                                                           }}>
                                                            Deny
                                                        </a>
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </LoadingCircle>
    )
}