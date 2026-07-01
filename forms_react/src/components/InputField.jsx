import React from 'react';

/**
 * InputField Component
 * A versatile reusable form input component.
 * Supports standard text inputs, dates, textarea, selects, and radio buttons.
 * 
 * Props:
 * - label: Label text displayed above the input.
 * - type: HTML input type (text, email, tel, date, select, radio, textarea). Defaults to 'text'.
 * - name: The field name key.
 * - value: Current input value (controlled component state).
 * - onChange: Change handler function.
 * - error: Error message text (if validation fails).
 * - placeholder: Placeholder text for inputs.
 * - options: Array of options (for select & radio types) formatted as { value, label }.
 */
function InputField({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  placeholder,
  options = []
}) {
  return (
    <div className="form-group">
      {/* Render form label */}
      {label && <label className="form-label">{label}</label>}

      {/* Render select dropdown */}
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`form-input ${error ? 'input-error' : ''}`}
        >
          <option value="">Select Course</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : 
      
      /* Render radio buttons */
      type === 'radio' ? (
        <div className="radio-group-container">
          {options.map((opt) => (
            <label key={opt.value} className="radio-label">
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={onChange}
                className="radio-input"
              />
              {opt.label}
            </label>
          ))}
        </div>
      ) : 

      /* Render textarea */
      type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form-input form-textarea ${error ? 'input-error' : ''}`}
          rows="3"
        />
      ) :
      
      /* Render standard inputs (text, email, tel, date) */
      (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form-input ${error ? 'input-error' : ''}`}
        />
      )}

      {/* Render error message if any validation error exists */}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

export default InputField;
