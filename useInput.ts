import { useState } from 'react';
import { hasWhiteSpace } from 'helpers';
import { whitespaceNotAllowedMessage } from 'const';

/*
  Text input logic and state. Returns values and functions to use in component.
  Usage:
  * Include and re-assign variables according to needed input.
  * Set options if needed. Be sure to include type: 'email' option if using email input.
  * Add UI component in page.
    Sample:

    // Name input logic.
    const {
      // Values.
      value: valueName,
      error: errorName,
      setError: setErrorName,
      onChange: onChangeName,
    } = useInput({
      // Options.
      noWhiteSpace: true,
    });

    // Name input UI.
    <FormInput
      type='text'
      name='name'
      label='Name'
      value={valueName}
      error={errorName}
      onChange={e => onChangeName(e)}
    />
    
    // Form submit.
    const onSubmit = (e: React.FormEvent) => {
      e.preventDefault(); // Prevent form sending.

      // Validate name.
      if (valueName.length === 0) {
        return setErrorName(requiredInputMessage);
      };
    };
*/

interface IUseInput {
  noWhiteSpace?: boolean;
  type?: string;
};

const useInput = (props: IUseInput) => {
  // Options.
  const { noWhiteSpace, type } = props;

  // State.
  const [value, setValue] = useState(''); // Value.
  const [error, setError] = useState(''); // Error.

  // Handle change.
  const onChange = (e: any) => {
    setError(''); // Clear error.
    const newValue = e.target.value; // Typed value. Put it into new variable to check first.

    // Helper. White space error.
    const handleWhiteSpaceError = () => {
      setTimeout(() => { setError('') }, 2000); // Clear error after timeout.
      setError(whitespaceNotAllowedMessage);
    };

    // Whitespace check.
    if (noWhiteSpace && hasWhiteSpace(newValue)) {
      return handleWhiteSpaceError(); // Prevent typing.
    };
    // Bug Fix. Input email white space react bug:
    // https://github.com/facebook/react/issues/6368
    if (noWhiteSpace && type === 'email') {
      if (e.key === " ") {
        handleWhiteSpaceError();
        e.preventDefault(); // Prevent typing. e.preventDefault() should be used for input type email.
      };
    };

    // If checks passed - update input value.
    setValue(newValue);
  };

  // Return values and functions to use.
  return {
    value,
    error,
    setError,
    onChange,
  };
};

export default useInput;
