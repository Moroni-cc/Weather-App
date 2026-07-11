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
    const city = weather?.current?.name || "Pucallpa";

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
        <aside className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#1E213A] px-8 py-8 text-white md:w-[42vw] md:min-w-105 md:max-w-130 2xl:w-142.25 2xl:min-w-142.25">
            {isSearching ? (
                <div className="absolute inset-0 z-20 bg-[#1E213A] px-8 py-8">
                    <button
                        aria-label="Close search"
                        onClick={() => setIsSearching(false)}
                        className="ml-auto mb-5 flex h-8 w-8 items-center justify-center"
                    >
                        <img src="/weatherapp/close.svg" alt="" className="h-5 w-5" />
                    </button>

                    <div className="flex gap-3">
                        <label className="flex h-11.5 flex-1 items-center gap-3 border border-[#E7E7EB] px-3">
                            <img src="/weatherapp/search.svg" alt="" className="h-5 w-5 opacity-60" />
                            <input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") submitSearch();
                                }}
                                placeholder="search location"
                                className="w-full bg-transparent text-lg text-[#E7E7EB] outline-none placeholder:text-[#A09FB1]"
                            />
                        </label>
                        <button
                            onClick={submitSearch}
                            className="h-11.5 bg-[#3C47E9] px-5 text-base font-semibold text-[#E7E7EB]"
                        >
                            Search
                        </button>
                    </div>

                    <div className="mt-12 space-y-6">
                        {searchingLocations ? (
                            <p className="text-lg text-[#A09FB1]">Searching...</p>
                        ) : null}

                        {!searchingLocations && locationResults.length === 0 && query ? (
                            <p className="text-lg text-[#A09FB1]">No locations yet</p>
                        ) : null}

                        {locationResults.map((location) => (
                            <button
                                key={location.id}
                                onClick={() => selectLocation(location)}
                                className="group flex w-full items-center justify-between px-6 py-5 text-left text-xl text-[#E7E7EB] hover:border hover:border-[#616475]"
                            >
                                <span>
                                    {location.name}
                                    {location.state ? <span className="text-[#A09FB1]">, {location.state}</span> : null}
                                    <span className="ml-6">{location.country}</span>
                                </span>
                                <img
                                    src="/weatherapp/arrow.svg"
                                    alt=""
                                    className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            ) : null}

            <div className="z-10 flex items-center justify-between">
                <button
                    onClick={() => setIsSearching(true)}
                    className="bg-[#6E707A] px-7 py-3 text-base font-medium text-[#E7E7EB] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                >
                    Search for Places
                </button>
                <button
                    aria-label="Use current location"
                    onClick={onCurrentLocation}
                    className="flex h-13 w-13 items-center justify-center rounded-full bg-[#6E707A]"
                >
                    <img src="/weatherapp/location.svg" alt="" className="h-7 w-7" />
                </button>
            </div>

            <div className="pointer-events-none absolute left-1/2 top-22 h-75 w-155 -translate-x-1/2 bg-[url('/weatherapp/others/Cloud-background.png')] bg-contain bg-center bg-no-repeat opacity-10" />

            <div className="relative z-10 mt-20 flex justify-center">
                <img src={`/weatherapp/weather/${icon}.png`} alt={description} className="h-47.5 w-57.5 object-contain md:h-51.25" />
            </div>

            <div className="relative z-10 mt-16 text-center md:mt-20">
                <h1 className="text-[118px] font-medium leading-none tracking-normal text-[#E7E7EB] md:text-[132px] 2xl:text-[144px]">
                    {temp}
                    <span className="text-5xl font-normal text-[#A09FB1]">°{unit}</span>
                </h1>
                <p className="mt-14 text-3xl font-semibold text-[#A09FB1] 2xl:mt-20 2xl:text-4xl">{description}</p>
            </div>

            <div className="relative z-10 mt-auto pb-1 text-center text-lg font-medium text-[#88869D]">
                <p>Today <span className="mx-4">·</span> {formatToday()}</p>
                <p className="mt-8 flex items-center justify-center gap-2 font-semibold">
                    <img src="/weatherapp/location_on.svg" alt="" className="h-5 w-5" />
                    {city}
                </p>
            </div>
        </aside>
    );
};
