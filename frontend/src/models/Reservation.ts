export default interface Reservation {
    id: number;
    periodFrom: string,
    periodTo: string,
    guestFirstName: string,
    guestLastName: string,
    apartmentName: string,
    status: string,
}