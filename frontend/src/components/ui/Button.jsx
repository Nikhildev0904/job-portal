import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles = 'px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    link: 'text-blue-600 hover:text-blue-800 underline p-0',
  };

  const buttonStyles = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;