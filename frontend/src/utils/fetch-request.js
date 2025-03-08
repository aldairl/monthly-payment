import { logoutAndRedirect } from "./authUtils";

export const fetchData = async (url, options = {}) => {

    const defaultOptions = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `bearer ${localStorage.getItem('authToken')}`
        },
    };

    const config = { ...defaultOptions, ...options }

    if (options.body) {
        config.body = JSON.stringify(options.body)
    }

    try {
        const response = await fetch(url, config)

        if (!response.ok) {
            const data = await response.json()

            if (response.status === 403) {
                console.log('Acceso prohibido: Código 403')
                logoutAndRedirect()
            }
            
            if (data.error && data.error.toLowerCase().includes("jwt expired")) {
                console.log('Token expirado: JWT expired')
                logoutAndRedirect()
            }

            throw new Error(`Error: ${data.error}`)
        }
        const data = await response.json()
        return data;
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error;
    }
}