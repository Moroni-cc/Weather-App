export const HighlightCard = ({ title, value, unit, children }) => (
  <article className="flex h-51.25 flex-col items-center bg-[#1E213A] px-8 py-4 text-center 2xl:h-60">
    <h3 className="text-xl font-medium text-[#E7E7EB]">{title}</h3>
    <p className="mt-8 text-[60px] font-bold leading-none text-[#E7E7EB] 2xl:text-[64px]">
      {value}
      <span className="text-4xl font-medium">{unit}</span>
    </p>
    {children}
  </article>
);
