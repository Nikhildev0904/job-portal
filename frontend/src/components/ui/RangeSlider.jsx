import React, { useState, useEffect } from 'react';

const RangeSlider = ({
  min,
  max,
  step,
  value = { min: 0, max: 100 },
  onChange,
  label,
  formatLabel,
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

  const getBackgroundSize = (value, min, max) => {
    return ((value - min) / (max - min)) * 100;
  };

  const formatValue = (value) => {
    return formatLabel ? formatLabel(value) : value;
  };

  return (
    <div className="mb-6">
      {label && <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>}

      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">
          {formatValue(localValues.min)}
        </span>
        <span className="text-sm text-gray-600">
          {formatValue(localValues.max)}
        </span>
      </div>

      <div className="relative h-1 bg-gray-200 rounded-full mt-4">
        <div
          className="absolute h-1 bg-purple-500 rounded-full"
          style={{
            left: `${getBackgroundSize(localValues.min, min, max)}%`,
            width: `${getBackgroundSize(localValues.max, min, max) - getBackgroundSize(localValues.min, min, max)}%`,
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValues.min}
          onChange={handleMinChange}
          className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none"
          style={{ zIndex: 2 }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValues.max}
          onChange={handleMaxChange}
          className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none"
          style={{ zIndex: 2 }}
        />

        <div
          className="absolute w-4 h-4 bg-white border-2 border-purple-500 rounded-full -mt-1.5 pointer-events-none"
          style={{ left: `calc(${getBackgroundSize(localValues.min, min, max)}% - 8px)` }}
        />

        <div
          className="absolute w-4 h-4 bg-white border-2 border-purple-500 rounded-full -mt-1.5 pointer-events-none"
          style={{ left: `calc(${getBackgroundSize(localValues.max, min, max)}% - 8px)` }}
        />
      </div>
    </div>
  );
};

export default RangeSlider;