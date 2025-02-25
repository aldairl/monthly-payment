
export const getLocalDate = (stringDateUTC) => {
    const date = new Date(stringDateUTC)

    const offset = date.getTimezoneOffset() * 60000 // Offset en milisegundos

    return new Date(date - offset).toISOString().split('.')[0].replace('T', ' ') // Convertido a ISO en local
}

export function numberFormatMiles(number) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', }).format(number)
}