// client/src/components/Modal.jsx
import React, { useEffect } from 'react';
import Button from './Button';

/**
 * Reusable, accessible Modal Overlay wrapper component.
 * 
 * @param {boolean} isOpen - Controls visibility state of the modal window
 * @param {function} onClose - Execution callback triggered when closure is initialized
 * @param {string} title - Heading label text shown at the top of the container box
 * @param {React.ReactNode} children - Core elements / forms rendered in the scrollable body cavity
 */
export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children 
}) {
  // Catch and bind Escape key actions to close the overlay cleanly
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevents background body scrolling
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset'; // Restores page scrolling on cleanup
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Render absolutely nothing if state instructs component closure
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Visual Alignment Container */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Background Backdrop Overlay Screen */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm" 
          onClick={onClose} 
        />

        {/* Trick browser into centering modal elements vertically */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Main Modal Card Frame Content Box */}
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          
          {/* Header Bar Section */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {title}
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-500 !px-2"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {/* Body Section Layout Injection Site */}
          <div className="mt-2">
            {children}
          </div>
          
        </div>
      </div>
    </div>
  );
}



