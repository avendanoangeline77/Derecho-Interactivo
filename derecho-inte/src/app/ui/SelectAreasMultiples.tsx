"use client";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

interface FiltroAreasProps {
  areas: { id: string; nombre: string }[];
  selectedAreas: string[];
  onChange: (values: string[]) => void;
}

export default function FiltroAreas({
  areas,
  selectedAreas,
  onChange,
}: FiltroAreasProps) {
  const options: Option[] = areas.map((a) => ({
    value: a.id,
    label: a.nombre,
  }));

  const selectedOptions = options.filter((o) =>
    selectedAreas.includes(o.value)
  );

  return (
    <Select
      isMulti
      options={options}
      value={selectedOptions}
      onChange={(selected) => onChange(selected.map((s) => s.value))}
      placeholder="Seleccionar áreas de derecho..."
      className="text-black"
      menuPortalTarget={typeof window !== "undefined" ? document.body : null}
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "#1f2937", // gris oscuro
          borderColor: "#4b5563",
          borderRadius: "0.5rem",
          color: "white",
        }),
        singleValue: (base) => ({ ...base, color: "white" }),
        input: (base) => ({ ...base, color: "white" }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: "#2563eb", // azul tailwind
          color: "white",
          borderRadius: "0.375rem",
        }),
        multiValueLabel: (base) => ({ ...base, color: "white" }),
        multiValueRemove: (base) => ({
          ...base,
          color: "white",
          ":hover": { backgroundColor: "#1e40af", color: "white" },
        }),
        menuPortal: (base) => ({ ...base, zIndex: 99999 }), // 👈 clave: sobre todo el modal
        menu: (base) => ({
          ...base,
          backgroundColor: "#374151", // gris medio
          color: "white",
          borderRadius: "0.5rem",
          zIndex: 99999,
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? "#4b5563" : "#374151",
          color: "white",
          cursor: "pointer",
        }),
      }}
    />
  );
}
