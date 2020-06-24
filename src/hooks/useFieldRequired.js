import {useState, useCallback} from 'react';

export default (value = '', error) => {
  const [field, setField] = useState(value);
  const [rError, setError] = useState();
  const onChange = useCallback(newValue => {
    setError(null);
    setField(newValue);
  }, []);

  const onValidate = useCallback(
    customError => {
      if (customError && typeof customError === 'function') {
        let computedError = customError(field);
        if (computedError) {
          setError(computedError);
        }
        return computedError;
      } else if (!field) {
        setError(customError || error);
        return customError || error;
      }
    },
    [setError, error, field],
  );
  return [field, onChange, onValidate, rError, setError];
};
