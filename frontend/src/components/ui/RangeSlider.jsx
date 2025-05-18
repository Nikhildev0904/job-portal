import React, { useState, useEffect } from 'react';

const RangeSlider = ({
  min,
  max,
  step,
  value = { min: 0, max: 100 },
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

  return (
    <div className="relative h-2">
      {/* Track */}
      <div className="absolute inset-0 bg-gray-200 rounded"></div>

      {/* Selected Range */}
      <div
        className="absolute h-2 bg-purple-500 rounded"
        style={{
          left: `${(localValues.min / max) * 100}%`,
          width: `${((localValues.max - localValues.min) / max) * 100}%`
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
        className="absolute w-full h-2 opacity-0 cursor-pointer"
      />

      {/* Max Thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={localValues.max}
        onChange={handleMaxChange}
        className="absolute w-full h-2 opacity-0 cursor-pointer"
      />

      {/* Min Thumb Visible Circle */}
      <div
        className="absolute w-5 h-5 bg-white border-2 border-purple-500 rounded-full -mt-1.5 -ml-2.5"
        style={{ left: `${(localValues.min / max) * 100}%`, top: '0' }}
      ></div>

      {/* Max Thumb Visible Circle */}
      <div
        className="absolute w-5 h-5 bg-white border-2 border-purple-500 rounded-full -mt-1.5 -ml-2.5"
        style={{ left: `${(localValues.max / max) * 100}%`, top: '0' }}
      ></div>
    </div>
  );
};

export default RangeSlider;