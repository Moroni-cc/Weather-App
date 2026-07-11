const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
const IPINFO_TOKEN = import.meta.env.VITE_IPINFO_TOKEN;
const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";

const fetchWeatherBundle = async (params, errorMessage) => {
    const currentRes = await fetch(`${BASE_URL}/weather?${params}`);
    if (!currentRes.ok) throw new Error(errorMessage);
    const current = await currentRes.json();

    const forecastRes = await fetch(`${BASE_URL}/forecast?${params}`);
    if (!forecastRes.ok) throw new Error("No se pudo obtener el pronostico");
    const forecast = await forecastRes.json();

    return { current, forecast };
}

export const getLocationByIP = async () => {
    try {
        const response = await fetch(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`)
        if (!response.ok) throw new Error("Error al obtener la ubicacion")
        const data = await response.json()
        return data.city
    } catch (error) {
        console.error("No se pudo obtener la IP", error)
        return null
    }
}

export const getWeatherData = async (city) => {
    try {
        const params = `q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
        return await fetchWeatherBundle(params, "No se pudo encontrar el clima para esta ubicacion")
    } catch (error) {
        console.error("Error al obtener datos del clima:", error);
        throw error;
    }
}

export const getWeatherDataByCoords = async (lat, lon) => {
    try {
        const params = `lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
        return await fetchWeatherBundle(params, "No se pudo encontrar el clima para tu ubicacion");
    } catch (error) {
        console.error("Error al obtener datos del clima por ubicacion:", error);
        throw error;
    }
}

export const searchLocations = async (query) => {
    const response = await fetch(`${GEO_URL}?q=${query}&limit=5&appid=${WEATHER_API_KEY}`);
    if (!response.ok) throw new Error("No se pudo buscar esa ubicacion");

    const locations = await response.json();

    return locations.map((location, index) => ({
        id: `${location.lat}-${location.lon}-${index}`,
        name: location.name,
        country: location.country,
        state: location.state,
        lat: location.lat,
        lon: location.lon,
    }));
}

