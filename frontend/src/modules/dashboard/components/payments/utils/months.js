export const MONTHS = [
    { name: 'Enero', },
    { name: 'Febrero' },
    { name: 'Marzo' },
    { name: 'Abril' },
    { name: 'Mayo' },
    { name: 'Junio' },
    { name: 'Julio' },
    { name: 'Agosto' },
    { name: 'Septiembre' },
    { name: 'Octubre' },
    { name: 'Noviembre' },
    { name: 'Diciembre' },
]

export const YEARS = () => {
    const currentYear = new Date().getFullYear()
    const YEARS = [{ name: currentYear - 1 }, { name: currentYear }, { name: currentYear + 1 }]
    return YEARS
}