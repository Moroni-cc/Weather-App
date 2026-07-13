import { formatForecastDay, toFahrenheit } from "../utils/weather";

export const ForecastCard = ({ day, index, unit }) => {
  const minC = Math.round(day?.main?.temp_min ?? 21);
  const maxC = Math.round(day?.main?.temp_max ?? 33);
  const icon = day?.weather?.[0]?.icon || "10d";
  const max = unit === "f" ? toFahrenheit(maxC) : maxC;
  const min = unit === "f" ? toFahrenheit(minC) : minC;

  return (
    <article className="flex h-full w-full flex-col items-center bg-[#1E213A] px-3 py-6 text-center">
      <h3 className="text-base font-medium text-[#E7E7EB]">
        {formatForecastDay(day?.dt_txt, index)}
      </h3>
      <img
        src={`/weatherapp/weather/${icon}.png`}
        alt=""
        className="my-3 h-16 w-16 object-contain"
      />
      <p className="flex gap-2 text-sm font-medium">
        <span className="text-[#E7E7EB]">{max}°{unit}</span>
        <span className="text-[#A09FB1]">{min}°{unit}</span>
      </p>
    </article>
  );
};