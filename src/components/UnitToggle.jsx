const units = ["c", "f"];

export const UnitToggle = ({ unit, onChange }) => (
  <div className="mb-7 flex justify-end gap-3 md:mb-6">
    {units.map((value) => (
      <button
        key={value}
        onClick={() => onChange(value)}
        className={`h-13 w-13 rounded-full text-lg font-bold ${unit === value ? "bg-[#E7E7EB] text-[#110E3C]" : "bg-[#585676] text-[#E7E7EB]"
          }`}
      >
        °{value.toUpperCase()}
      </button>
    ))}
  </div>
);
