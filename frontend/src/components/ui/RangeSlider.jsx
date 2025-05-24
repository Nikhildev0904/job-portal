import React, { useState, useEffect, useRef } from 'react';

const RangeSlider = ({
  min = 0,
  max = 166666,
  step = 1000,
  value = { min: 0, max: 166666 }, // Changed default
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
      const clampedValue = Math.max(min, Math.min(max, newValue));

      if (isDraggingMin) {
        // Ensure min doesn't exceed max
        const updatedMin = Math.min(clampedValue, localValues.max - step);
        setLocalValues(prev => ({ ...prev, min: Math.max(min, updatedMin) }));
      } else if (isDraggingMax) {
        // Ensure max doesn't go below min
        const updatedMax = Math.max(clampedValue, localValues.min + step);
        setLocalValues(prev => ({ ...prev, max: Math.min(max, updatedMax) }));
      }
    };

    const handleTouchMove = (e) => {
      e.preventDefault(); // Prevent scrolling while dragging
      const touch = e.touches[0];
      if (!sliderRef.current || (!isDraggingMin && !isDraggingMax)) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const sliderWidth = rect.width;
      const offsetX = Math.max(0, Math.min(sliderWidth, touch.clientX - rect.left));

      // Calculate percentage and value
      const percentage = offsetX / sliderWidth;
      const newValue = Math.round((percentage * (max - min) + min) / step) * step;
      const clampedValue = Math.max(min, Math.min(max, newValue));

      if (isDraggingMin) {
        const updatedMin = Math.min(clampedValue, localValues.max - step);
        setLocalValues(prev => ({ ...prev, min: Math.max(min, updatedMin) }));
      } else if (isDraggingMax) {
        const updatedMax = Math.max(clampedValue, localValues.min + step);
        setLocalValues(prev => ({ ...prev, max: Math.min(max, updatedMax) }));
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
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
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-gray-300 rounded-full"></div>

      {/* Active range */}
      <div
        className="absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-black rounded-full"
        style={{
          left: calculatePosition(localValues.min),
          width: `calc(${calculatePosition(localValues.max)} - ${calculatePosition(localValues.min)})`,
        }}
      ></div>

      {/* Min thumb */}
      <div
        className="absolute w-4 h-4 bg-black rounded-full z-10 cursor-grab active:cursor-grabbing flex items-center justify-center"
        style={{
          left: `calc(${calculatePosition(localValues.min)} - 8px)`,
          top: '50%',
          transform: 'translateY(-50%)',
          touchAction: 'none'
        }}
        onMouseDown={handleMinThumbMouseDown}
        onTouchStart={handleMinThumbMouseDown}
      >
        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
      </div>

      {/* Max thumb */}
      <div
        className="absolute w-4 h-4 bg-black rounded-full z-10 cursor-grab active:cursor-grabbing flex items-center justify-center"
        style={{
          left: `calc(${calculatePosition(localValues.max)} - 8px)`,
          top: '50%',
          transform: 'translateY(-50%)',
          touchAction: 'none'
        }}
        onMouseDown={handleMaxThumbMouseDown}
        onTouchStart={handleMaxThumbMouseDown}
      >
        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default RangeSlider;