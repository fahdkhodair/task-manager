// client/src/components/Button.jsx
import React from 'react';

/**
 * Reusable Button component with loading spinner states
 * 
 * @param {string} type - Button behavior type ('button', 'submit', 'reset')
 * @param {string} variant - Look preset ('primary', 'secondary', 'danger', 'outline', 'ghost')
 * @param {string} size - Sizing options ('sm', 'md', 'lg')
 * @param {boolean} isLoading - Shows an inline spinner and disables interactions when true
 * @param {boolean} disabled - Disables clicking conditions when true
 * @param {React.ReactNode} children - Button text content or layout components
 * @param {string} className - Extensible custom layout override classes
 */
export default function Button({
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  children,
  className = '',
  ...props
}) {
  // Base core dynamic behavior configurations
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Specific theme stylistic parameters
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 border border-transparent shadow-sm',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 border border-transparent',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-transparent shadow-sm',
    outline: 'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent',
  };

  // Dimensional structure configurations
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  // Compose all styling classes safely
  const computedClasses = `${baseStyle} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`.trim();

  // Combine native manual states with active backend payload request conditions
  const isButtonDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      className={computedClasses}
      disabled={isButtonDisabled}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 current-color"
          xmlns="http://w3.org"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

