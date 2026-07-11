import { useCallback, useEffect, useState } from "react"
import { getLocationByIP, getWeatherData, getWeatherDataByCoords, searchLocations } from "../services/weatherService"

export const useWeather = () => {
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [locationResults, setLocationResults] = useState([])
    const [searchingLocations, setSearchingLocations] = useState(false)

    const fetchWeather = useCallback(async (city) => {
        setLoading(true)
        setError(null)
        try {
            const data = await getWeatherData(city)
            setWeather(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    const fetchWeatherByIP = useCallback(async () => {
        const cityIP = await getLocationByIP()
        await fetchWeather(cityIP || "Huanuco")
    }, [fetchWeather])

    const fetchCurrentLocation = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            if ("geolocation" in navigator) {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject)
                })
                const { latitude, longitude } = position.coords
                const data = await getWeatherDataByCoords(latitude, longitude)
                setWeather(data)
                return
            }

            await fetchWeatherByIP()
        } catch (err) {
            try {
                await fetchWeatherByIP()
            } catch {
                setError(err.message)
            }
        } finally {
            setLoading(false)
        }
    }, [fetchWeatherByIP])

    const fetchLocations = useCallback(async (query) => {
        setSearchingLocations(true)
        setError(null)

        try {
            const results = await searchLocations(query)
            setLocationResults(results)
        } catch (err) {
            setError(err.message)
            setLocationResults([])
        } finally {
            setSearchingLocations(false)
        }
    }, [])

    const selectLocation = useCallback(async (location) => {
        setLoading(true)
        setError(null)

        try {
            const data = await getWeatherDataByCoords(location.lat, location.lon)
            setWeather(data)
            setLocationResults([])
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        const loadInitialWeather = async () => {
            try {
                const cityIP = await getLocationByIP()
                const data = await getWeatherData(cityIP || "Huanuco")
                setWeather(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadInitialWeather()
    }, []);

    return {
        weather,
        loading,
        error,
        locationResults,
        searchingLocations,
        fetchWeather,
        fetchCurrentLocation,
        fetchLocations,
        selectLocation,
    };
}
