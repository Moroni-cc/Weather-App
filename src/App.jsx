import { Sidebar } from './components/Sidebar';
import { ForecastCard } from './components/ForecastCard';
import { HighlightCard } from './components/HighlightCard';
import { UnitToggle } from './components/UnitToggle';
import { useWeather } from './hooks/useWeather';
import { useMemo, useState } from 'react';
import { getDailyForecast, getWindDirection, toMiles, toMph } from './utils/weather';

function App() {
  const {
    weather,
    loading,
    error,
    locationResults,
    searchingLocations,
    fetchCurrentLocation,
    fetchLocations,
    selectLocation,
  } = useWeather();
  const [unit, setUnit] = useState('c');

  const dailyForecast = useMemo(() => getDailyForecast(weather?.forecast), [weather]);
  const current = weather?.current;
  const windSpeed = current?.wind?.speed ?? 1.25;
  const visibility = current?.visibility ?? 10000;
  const humidity = current?.main?.humidity ?? 41;
  const pressure = current?.main?.pressure ?? 1011;
  const windDirection = getWindDirection(current?.wind?.deg);
  const windValue = unit === 'f' ? toMph(windSpeed).toFixed(1) : windSpeed.toFixed(2);
  const windUnit = unit === 'f' ? 'mph' : 'ms';
  const visibilityValue = unit === 'f' ? toMiles(visibility).toFixed(2) : (visibility / 1000).toFixed(2);
  const visibilityUnit = unit === 'f' ? 'miles' : 'km';

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#100E1D] text-2xl font-semibold text-[#E7E7EB]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#100E1D] font-sans text-[#E7E7EB] md:flex">

      <Sidebar
        weather={weather}
        onCurrentLocation={fetchCurrentLocation}
        onLocationSearch={fetchLocations}
        onLocationSelect={selectLocation}
        locationResults={locationResults}
        searchingLocations={searchingLocations}
        unit={unit}
      />

      <main className="flex-1 px-6 py-8 md:px-8 xl:px-10 2xl:px-24">
        <div className="mx-auto max-w-210">
          <UnitToggle unit={unit} onChange={setUnit} />

          {error ? <p className="mb-4 text-[#FFEC65]">{error}</p> : null}

          <section className="grid grid-cols-2 justify-items-stretch gap-5 sm:grid-cols-3 lg:grid-cols-5 xl:gap-5 2xl:gap-6">
            {(dailyForecast.length ? dailyForecast : Array.from({ length: 5 })).map((day, index) => (
              <ForecastCard key={day?.dt ?? index} day={day} index={index} unit={unit} />
            ))}
          </section>

          <section className="mt-8 md:mt-7">
            <h2 className="text-2xl font-bold text-[#E7E7EB] md:text-3xl">Today's Highlights</h2>

            <div className="mt-7 grid gap-7 lg:grid-cols-2 2xl:gap-8">
              <HighlightCard title="Wind status" value={windValue} unit={windUnit}>
                <div className="mt-9 flex items-center gap-3 text-lg">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6E707A]">
                    <img src="/weatherapp/navigation.svg" alt="" className="h-5 w-5" />
                  </span>
                  {windDirection}
                </div>
              </HighlightCard>

              <HighlightCard title="Humidity" value={humidity} unit="%">
                <div className="mt-6 w-full max-w-71">
                  <div className="flex justify-between text-xs font-bold text-[#A09FB1]">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-[#E7E7EB]">
                    <div className="h-2 rounded-full bg-[#FFEC65]" style={{ width: `${humidity}%` }} />
                  </div>
                  <p className="mt-1 text-right text-xs font-bold text-[#A09FB1]">%</p>
                </div>
              </HighlightCard>

              <HighlightCard title="Visibility" value={visibilityValue} unit={visibilityUnit} />
              <HighlightCard title="Air Pressure" value={pressure} unit="mb" />
            </div>
          </section>

          <footer className="mt-7 text-center text-sm font-medium text-[#A09FB1]">
            Created by <span className="font-bold">JoregeSosa</span> - devChallenges.io
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
