import { useState } from "react";

const formatToday = () =>
    new Date().toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
    });

export const Sidebar = ({
    weather,
    onCurrentLocation,
    onLocationSearch,
    onLocationSelect,
    locationResults,
    searchingLocations,
    unit,
}) => {
    const [isSearching, setIsSearching] = useState(false);
    const [query, setQuery] = useState("");
    const tempC = Math.round(weather?.current?.main?.temp ?? 0);
    const temp = unit === "f" ? Math.round((tempC * 9) / 5 + 32) : tempC;
    const description = weather?.current?.weather?.[0]?.main || "Loading...";
    const icon = weather?.current?.weather?.[0]?.icon || "01d";
    const city = weather?.current?.name || "Huánuco";

    const submitSearch = () => {
        const nextCity = query.trim();
        if (!nextCity) return;
        onLocationSearch(nextCity);
    };

    const selectLocation = (location) => {
        onLocationSelect(location);
        setIsSearching(false);
        setQuery("");
    };

    return (
        <aside className="relative flex h-screen flex-col overflow-hidden bg-[#1E213A] px-8 py-6 text-white md:w-[34vw] md:min-w-90 md:max-w-110 2xl:w-115 2xl:min-w-115">
            <div className="flex flex-col grow h-full justify-between">

                <div className="z-10 flex items-center justify-between shrink-0">
                    <button
                        onClick={() => setIsSearching(true)}
                        className="bg-[#6E707A] px-5 py-2.5 text-base font-medium text-[#E7E7EB] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-[#5a5c66] transition-colors"
                    >
                        Search for Places
                    </button>
                    <button
                        aria-label="Use current location"
                        onClick={onCurrentLocation}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6E707A] hover:bg-[#5a5c66] transition-colors"
                    >
                        <img src="/weatherapp/location.svg" alt="" className="h-6 w-6" />
                    </button>
                </div>

                <div className="pointer-events-none absolute left-1/2 top-20 h-70 w-150 -translate-x-1/2 bg-[url('/weatherapp/others/Cloud-background.png')] bg-contain bg-center bg-no-repeat opacity-10" />

                <div className="flex flex-col justify-center items-center my-auto py-4">
                    <div className="relative z-10 flex justify-center max-h-44 md:max-h-48">
                        <img
                            src={`/weatherapp/weather/${icon}.png`}
                            alt={description}
                            className="h-36 w-48 object-contain md:h-40 2xl:h-48"
                        />
                    </div>

                    <div className="relative z-10 mt-6 text-center">
                        <h1 className="text-[84px] font-medium leading-none tracking-normal text-[#E7E7EB] md:text-[96px] 2xl:text-[120px]">
                            {temp}
                            <span className="text-3xl font-normal text-[#A09FB1] md:text-4xl">°{unit}</span>
                        </h1>
                        <p className="mt-4 text-2xl font-semibold text-[#A09FB1] 2xl:text-3xl">{description}</p>
                    </div>
                </div>

                <div className="relative z-10 text-center text-base font-medium text-[#88869D] shrink-0 mt-auto">
                    <p>Today <span className="mx-3">·</span> {formatToday()}</p>
                    <p className="mt-4 flex items-center justify-center gap-2 font-semibold text-white">
                        <img src="/weatherapp/location_on.svg" alt="" className="h-5 w-5" />
                        {city}
                    </p>
                </div>
            </div>

            {isSearching ? (
                <div className="absolute inset-0 z-20 bg-[#1E213A] px-8 py-6 overflow-y-auto">
                    <button
                        aria-label="Close search"
                        onClick={() => setIsSearching(false)}
                        className="ml-auto mb-4 flex h-8 w-8 items-center justify-center hover:opacity-80"
                    >
                        <img src="/weatherapp/close.svg" alt="" className="h-5 w-5" />
                    </button>

                    <div className="flex gap-3">
                        <label className="flex h-11 flex-1 items-center gap-3 border border-[#E7E7EB] px-3">
                            <img src="/weatherapp/search.svg" alt="" className="h-5 w-5 opacity-60" />
                            <input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") submitSearch();
                                }}
                                placeholder="search location"
                                className="w-full bg-transparent text-base text-[#E7E7EB] outline-none placeholder:text-[#A09FB1]"
                            />
                        </label>
                        <button
                            onClick={submitSearch}
                            className="h-11 bg-[#3C47E9] px-4 text-base font-semibold text-[#E7E7EB] hover:bg-[#313bac] transition-colors"
                        >
                            Search
                        </button>
                    </div>

                    <div className="mt-8 space-y-4">
                        {searchingLocations ? (
                            <p className="text-base text-[#A09FB1]">Searching...</p>
                        ) : null}

                        {!searchingLocations && locationResults.length === 0 && query ? (
                            <p className="text-base text-[#A09FB1]">No locations yet</p>
                        ) : null}

                        {locationResults.map((location) => (
                            <button
                                key={location.id}
                                onClick={() => selectLocation(location)}
                                className="group flex w-full items-center justify-between px-5 py-4 text-left text-lg text-[#E7E7EB] hover:border hover:border-[#616475]"
                            >
                                <span>
                                    {location.name}
                                    {location.state ? <span className="text-[#A09FB1]">, {location.state}</span> : null}
                                    <span className="ml-4 text-sm opacity-80">{location.country}</span>
                                </span>
                                <img
                                    src="/weatherapp/arrow.svg"
                                    alt=""
                                    className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            ) : null}
        </aside>
    );
};

export default Sidebar;