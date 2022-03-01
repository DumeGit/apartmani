export function formatDate(date : string) :string {
    const array = date.toString().split("-");
    return `${array[2]}.${array[1]}.${array[0]}`;
}