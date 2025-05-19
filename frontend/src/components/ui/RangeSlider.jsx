import React, { useState, useEffect } from 'react';

const RangeSlider = ({
  min = 0,
  max = 2000000,
  step = 10000,
  value = { min: 0, max: 1000000 },
  onChange,
}) => {
  const [localValues, setLocalValues] = useState(value);

  useEffect(() => {
    setLocalValues(value);
  }, [value]);

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), localValues.max);
    const newValues = { ...localValues, min: newMin };
    setLocalValues(newValues);
    onChange(newValues);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), localValues.min);
    const newValues = { ...localValues, max: newMax };
    setLocalValues(newValues);
    onChange(newValues);
  };

  const calculatePosition = (val) => `${((val - min) / (max - min)) * 100}%`;

  return (
    <div className="relative h-6 mt-2">
      {/* Track */}
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-300 rounded-full"></div>

      {/* Selected Range */}
      <div
        className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-[#780eca] rounded-full"
        style={{
          left: calculatePosition(localValues.min),
          width: `calc(${calculatePosition(localValues.max)} - ${calculatePosition(localValues.min)})`,
        }}
      ></div>

      {/* Min Thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={localValues.min}
        onChange={handleMinChange}
        className="absolute w-full h-2 opacity-0 cursor-pointer z-20"
      />

      {/* Max Thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={localValues.max}
        onChange={handleMaxChange}
        className="absolute w-full h-2 opacity-0 cursor-pointer z-20"
      />

      {/* Min Thumb Visible */}
      <div
        className="absolute w-5 h-5 bg-white border-2 border-[#780eca] rounded-full z-30"
        style={{ left: `calc(${calculatePosition(localValues.min)} - 10px)`, top: '0.25rem' }}
      ></div>

      {/* Max Thumb Visible */}
      <div
        className="absolute w-5 h-5 bg-white border-2 border-[#780eca] rounded-full z-30"
        style={{ left: `calc(${calculatePosition(localValues.max)} - 10px)`, top: '0.25rem' }}
      ></div>
    </div>
  );
};

export default RangeSlider;
