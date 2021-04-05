import React from 'react';
import { v4 as uuid } from 'uuid';
import { FormGroup, TextField, FormHelperText } from '@material-ui/core';

// Form input UI. Use with hooks/useInput.tsx.
interface IFormInput {
  type: string;
  name: string;
  label: string;
  value: string;
  helperText?: string;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  error: string;
  onChange: (e: any) => void;
  noWhiteSpace?: boolean;
  autoComplete?: string;
};

const FormInput: React.FC<IFormInput> = props => {
  const {
    type,
    name,
    label,
    value,
    helperText,
    placeholder,
    autoFocus,
    error,
    onChange,
    autoComplete,
  } = props;

  const hasError = error.length > 0; // hasError if errors array is not empty.

  return (
    <FormGroup>
      <TextField
        type={type}
        name={name}
        label={label}
        value={value}
        autoFocus={autoFocus}
        error={hasError}
        placeholder={placeholder}
        variant='outlined'
        fullWidth
        onChange={e => onChange(e)}
        autoComplete={autoComplete}

        // Fix. Prevent white space in email input.
        // https://github.com/facebook/react/issues/6368
        onKeyDown={type === 'email' ? e => onChange(e) : () => { }}
      />

      {/* Initial helper text. If exist and has no errors. */}
      {
        helperText && !hasError &&
        <FormHelperText>
          {helperText}
        </FormHelperText>
      }

      {/* Error if exist */}
      {hasError &&
        <FormHelperText error key={uuid()}>
          {error}
        </FormHelperText>
      }
    </FormGroup>
  );
};

export default FormInput;
