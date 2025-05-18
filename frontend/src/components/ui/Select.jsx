import React, { forwardRef } from 'react';

const Select = forwardRef(({
  label,
  name,
  options,
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={name}
        name={name}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

export default Select;