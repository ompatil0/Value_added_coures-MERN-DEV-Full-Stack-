import React from 'react';

/**
 * Button Component
 * A reusable button with support for different styled variants (primary, secondary, danger, etc.)
 * 
 * Props:
 * - children: The text or elements to display inside the button.
 * - onClick: Function to execute on click.
 * - type: Button HTML type (button, submit, reset). Defaults to 'button'.
 * - variant: Styling class variant ('primary', 'secondary', 'danger'). Defaults to 'primary'.
 * - disabled: Boolean flag to disable the button.
 */
function Button({ children, onClick, type = 'button', variant = 'primary', disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
}

export default Button;
