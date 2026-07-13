export const HighlightCard = ({ title, value, unit, children }) => (
  <article className="flex flex-col items-center bg-[#1E213A] px-6 py-8 text-center justify-center h-full">
    <h3 className="text-lg font-medium text-[#E7E7EB]">{title}</h3>
    <p className="mt-3 text-6xl font-bold leading-none text-[#E7E7EB]">
      {value}
      <span className="text-2xl font-medium ml-1">{unit}</span>
    </p>
    {children}
  </article>
);