const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
const IPINFO_TOKEN = import.meta.env.VITE_IPINFO_TOKEN;

export const getLocationByIP = async () => {
    try {
        const response = await fetch(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`)
        if (!response.ok) throw new Error("Error al obtener la ubicacion")
        const data = await response.jsom()
        return data.city
    } catch (error) {
        console.error("No se pudo obtener la IP", error)
        return null
    }
}

export const getWeatherData = async (city) => {
    try {
        const currentRes = await fetch(`${BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`)
        if (!currentRes.ok) throw new Error("Ciudad encontrada")
        const currentData = await currentRes.jsom()

        const forecastRes = await fetch(`${BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`)
        const forecastData = await forecastRes.jsom()

        return { current: currentData, forecast: forecastData }

    } catch (error) {
        console.error("Error al obtener datos del clima:", error);
        throw error;
    }
}

