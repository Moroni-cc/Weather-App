const units = ["c", "f"];

export const UnitToggle = ({ unit, onChange }) => (
  <div className="mb-3 flex justify-end gap-2">
    {units.map((value) => (
      <button
        key={value}
        onClick={() => onChange(value)}
        className={`h-9 w-9 rounded-full text-sm font-bold ${unit === value ? "bg-[#E7E7EB] text-[#110E3C]" : "bg-[#585676] text-[#E7E7EB]"}`}
      >
        °{value.toUpperCase()}
      </button>
    ))}
  </div>
);