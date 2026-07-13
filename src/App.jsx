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
    <div className="h-screen w-screen flex flex-col md:flex-row bg-[#100E1D] font-sans text-[#E7E7EB] overflow-hidden">

      <Sidebar
        weather={weather}
        onCurrentLocation={fetchCurrentLocation}
        onLocationSearch={fetchLocations}
        onLocationSelect={selectLocation}
        locationResults={locationResults}
        searchingLocations={searchingLocations}
        unit={unit}
      />

      <main className="flex-1 h-screen flex flex-col px-6 py-4 md:px-12 xl:px-16 2xl:px-24 overflow-hidden">
        <div className="mx-auto w-full max-w-210 h-full flex flex-col justify-between">

          <div className="flex justify-end shrink-0">
            <UnitToggle unit={unit} onChange={setUnit} />
          </div>

          {error ? <p className="text-[#FFEC65] shrink-0">{error}</p> : null}

          <section className="grid grid-cols-2 justify-items-stretch gap-3 sm:grid-cols-3 lg:grid-cols-5 shrink-0">
            {(dailyForecast.length ? dailyForecast : Array.from({ length: 5 })).map((day, index) => (
              <ForecastCard key={day?.dt ?? index} day={day} index={index} unit={unit} />
            ))}
          </section>

          <section className="grow flex flex-col justify-center min-h-0">
            <h2 className="text-xl font-bold text-[#E7E7EB] mb-4">Today's Highlights</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
              <HighlightCard title="Wind status" value={windValue} unit={windUnit}>
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6E707A]">
                    <img src="/weatherapp/navigation.svg" alt="" className="h-4 w-4" />
                  </span>
                  {windDirection}
                </div>
              </HighlightCard>

              <HighlightCard title="Humidity" value={humidity} unit="%">
                <div className="mt-4 w-full max-w-60">
                  <div className="flex justify-between text-xs text-[#A09FB1]"><span>0</span><span>50</span><span>100</span></div>
                  <div className="h-2 rounded-full bg-[#E7E7EB] mt-1"><div className="h-2 rounded-full bg-[#FFEC65]" style={{ width: `${humidity}%` }} /></div>
                </div>
              </HighlightCard>

              <HighlightCard title="Visibility" value={visibilityValue} unit={visibilityUnit} />
              <HighlightCard title="Air Pressure" value={pressure} unit="mb" />
            </div>
          </section>

          <footer className="text-center text-xs font-medium text-[#A09FB1] shrink-0 py-2">
            Created by <span className="font-bold">JoregeSosa</span> - devChallenges.io
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;