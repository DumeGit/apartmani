export interface ApartmentWithDates {
    id: number,
    name: string,
    address: string,
    averageRating: number,
    dailyCost: number,
    description: string,
    disabledDates: Date[]
}