import React, { forwardRef } from 'react';

const Input = forwardRef(({
  type = 'text',
  label,
  name,
  placeholder,
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
      <input
        ref={ref}
        type={type}
        id={name}
        name={name}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
        } ${className}`}
        placeholder={placeholder}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

export default Input;