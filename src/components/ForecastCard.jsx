import { formatForecastDay, toFahrenheit } from "../utils/weather";

export const ForecastCard = ({ day, index, unit }) => {
  const minC = Math.round(day?.main?.temp_min ?? 21);
  const maxC = Math.round(day?.main?.temp_max ?? 33);
  const icon = day?.weather?.[0]?.icon || "10d";
  const max = unit === "f" ? toFahrenheit(maxC) : maxC;
  const min = unit === "f" ? toFahrenheit(minC) : minC;

  return (
    <article className="flex h-44 w-full min-w-0 flex-col items-center bg-[#1E213A] px-3 py-6 text-center 2xl:h-50.25 2xl:px-4">
      <h3 className="w-full truncate text-lg font-medium text-[#E7E7EB] 2xl:text-xl">
        {formatForecastDay(day?.dt_txt, index)}
      </h3>
      <img
        src={`/weatherapp/weather/${icon}.png`}
        alt=""
        className="mt-6 h-14 w-16 object-contain 2xl:mt-7 2xl:h-16"
      />
      <p className="mt-auto flex gap-2 text-sm font-medium 2xl:gap-3 2xl:text-base">
        <span className="text-[#E7E7EB]">
          {max}°{unit}
        </span>
        <span className="text-[#A09FB1]">
          {min}°{unit}
        </span>
      </p>
    </article>
  );
};
