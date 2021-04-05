import { useState } from 'react';

/*
  Select logic and state. Returns values and functions to use in component.
  Usage:
  * Include and re-assign variables according to needed select.
  * Add UI component in page.
    Sample:

  // Account select logic.
  const {
    // Values.
    value: valueAccount,
    error: errorAccount,
    setError: setErrorAccount,
    onChange: onChangeAccount,
  } = useSelect();
  
  // Account select UI.
  <FormSelect
    name='account'
    label='Account'
    value={valueAccount}
    error={errorAccount}
    onChange={e => onChangeAccount(e)}
    options={[
      {
        value: 'account-1',
        text: 'Account 1'
      },
      {
        value: 'account-2',
        text: 'Account 2'
      },
    ]}
  />

*/

const useSelect = () => {
  // State.
  const [value, setValue] = useState(''); // Value.
  const [error, setError] = useState(''); // Error.

  // Handle change.
  const onChange = (e: any) => {
    setError(''); // Clear error. We don't set anny errors in select here. But we leave error cleaning because error can be setted on form submit in parent component.
    setValue(e.target.value);
  };

  // Return values and functions to use.
  return {
    value,
    error,
    setError,
    onChange,
  };
};

export default useSelect;
