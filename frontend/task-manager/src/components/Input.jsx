// client/src/components/Input.jsx
import React from 'react';

export default function Input({
  label,
  type = 'text',
  name,
  id,
  error = null,
  disabled = false,
  placeholder = '',
  className = '',
  ...props
}) {
  return (
    <div className="w-full text-left">
      {label && (
        <label 
          htmlFor={id || name} 
          className={`block text-sm font-medium mb-1.5 ${error ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'}`}
        >
          {label}
        </label>
      )}

      <div className="relative rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          id={id || name}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full px-3 py-2 text-sm bg-gray-50 border rounded-md shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-white ${
            error ? 'border-red-300 text-red-900 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700'
          } ${className}`}
          {...props}
        />
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400" id={`${id || name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}


