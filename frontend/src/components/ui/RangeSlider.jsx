import React, { useState, useEffect, useRef } from 'react';

const RangeSlider = ({
  min = 0,
  max = 2000000,
  step = 10000,
  value = { min: 0, max: 2000000 },
  onChange,
}) => {
  const [localValues, setLocalValues] = useState(value);
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);
  const sliderRef = useRef(null);

  // Update local state when props change
  useEffect(() => {
    setLocalValues(value);
  }, [value]);

  // Handle mouse/touch events
  useEffect(() => {
    const handleMouseUp = () => {
      if (isDraggingMin || isDraggingMax) {
        // Only trigger onChange when drag is complete
        onChange(localValues);
      }
      setIsDraggingMin(false);
      setIsDraggingMax(false);
    };

    const handleMouseMove = (e) => {
      if (!sliderRef.current || (!isDraggingMin && !isDraggingMax)) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const sliderWidth = rect.width;
      const offsetX = Math.max(0, Math.min(sliderWidth, e.clientX - rect.left));

      // Calculate percentage and value
      const percentage = offsetX / sliderWidth;
      const newValue = Math.round((percentage * (max - min) + min) / step) * step;

      if (isDraggingMin) {
        // Ensure min doesn't exceed max
        const updatedMin = Math.min(newValue, localValues.max - step);
        setLocalValues(prev => ({ ...prev, min: updatedMin }));
      } else if (isDraggingMax) {
        // Ensure max doesn't go below min
        const updatedMax = Math.max(newValue, localValues.min + step);
        setLocalValues(prev => ({ ...prev, max: updatedMax }));
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDraggingMin, isDraggingMax, min, max, step, onChange, localValues]);

  const calculatePosition = (val) => {
    return `${((val - min) / (max - min)) * 100}%`;
  };

  const handleMinThumbMouseDown = (e) => {
    e.preventDefault();
    setIsDraggingMin(true);
  };

  const handleMaxThumbMouseDown = (e) => {
    e.preventDefault();
    setIsDraggingMax(true);
  };

  return (
    <div className="relative h-6 mt-2" ref={sliderRef}>
      {/* Track */}
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-300 rounded-full"></div>

      {/* Selected Range */}
      <div
        className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-black rounded-full"
        style={{
          left: calculatePosition(localValues.min),
          width: `calc(${calculatePosition(localValues.max)} - ${calculatePosition(localValues.min)})`,
        }}
      ></div>

      {/* Min Thumb */}
      <div
        className="absolute w-5 h-5 bg-white border-2 border-black rounded-full z-10 cursor-grab active:cursor-grabbing"
        style={{
          left: `calc(${calculatePosition(localValues.min)} - 10px)`,
          top: '0.25rem',
          touchAction: 'none'
        }}
        onMouseDown={handleMinThumbMouseDown}
        onTouchStart={handleMinThumbMouseDown}
      ></div>

      {/* Max Thumb */}
      <div
        className="absolute w-5 h-5 bg-white border-2 border-black rounded-full z-10 cursor-grab active:cursor-grabbing"
        style={{
          left: `calc(${calculatePosition(localValues.max)} - 10px)`,
          top: '0.25rem',
          touchAction: 'none'
        }}
        onMouseDown={handleMaxThumbMouseDown}
        onTouchStart={handleMaxThumbMouseDown}
      ></div>
    </div>
  );
};

export default RangeSlider;