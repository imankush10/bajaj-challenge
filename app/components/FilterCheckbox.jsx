import dynamic from "next/dynamic";
import React from "react";

// Dynamically import react-select to avoid SSR issues in Next.js
const Select = dynamic(() => import("react-select"), { ssr: false });

export default function FilterCheckbox({ filters, onChange }) {
  const options = [
    { value: "numbers", label: "Numbers" },
    { value: "alphabets", label: "Alphabets" },
    { value: "highest_alphabet", label: "Highest Alphabet" },
  ];

  // Map selected filters to options
  const selectedOptions = filters.map((filter) =>
    options.find((option) => option.value === filter)
  );

  const handleSelectChange = (selectedOptions) => {
    const selectedFilters = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    onChange(selectedFilters);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Multi Filter
      </label>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleSelectChange}
        placeholder="Select filters..."
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
}
