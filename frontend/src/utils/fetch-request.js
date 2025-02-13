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
            throw new Error(`Error: ${data.error}`)
        }
        const data = await response.json()
        return data;
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error;
    }
}