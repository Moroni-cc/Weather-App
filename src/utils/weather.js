export const windDirections = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
];

export const toFahrenheit = (temp) => Math.round((temp * 9) / 5 + 32);
export const toMph = (speed) => speed * 2.236936;
export const toMiles = (meters) => meters / 1609.344;

export const getWindDirection = (degrees = 0) =>
  windDirections[Math.round(degrees / 22.5) % windDirections.length];

export const formatForecastDay = (dateText, index) => {
  if (index === 0) return "Tomorrow";

  return new Date(dateText).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

export const getDailyForecast = (forecast) => {
  const list = forecast?.list ?? [];
  const days = [];
  const seen = new Set();
  const today = new Date().toISOString().slice(0, 10);

  for (const item of list) {
    const key = item.dt_txt?.slice(0, 10);
    if (!key || key === today || seen.has(key)) continue;

    seen.add(key);
    days.push(item);
    if (days.length === 5) break;
  }

  return days;
};
