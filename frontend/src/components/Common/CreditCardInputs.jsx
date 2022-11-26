import React, { useState } from 'react';
import { TextField } from '@mui/material';

export const CreditCardNumber = (props) => {
  const [, setValue] = useState('');
  const [parsedValue, setParsedValue] = useState('');

  const processInput = (e) => {
    const code = e.which || e.keyCode;
    return !(code > 31 && (code < 48 || code > 57));
  };

  const handleChange = (value) => {
    const result = value.replace(/\D/g, '').slice(0, 16);
    setValue(result);

    const matches = result.match(/.{1,4}/g);
    setParsedValue(matches ? matches.join(' ') : '');
  };

  return (
    <TextField
      InputLabelProps={{ shrink: true }}
      {...props}
      value={parsedValue}
      onChange={(e) => handleChange(e.currentTarget.value)}
    />
  );
};

export const CreditCardExpirationDate = (props) => {
  const [, setValue] = useState('');
  const [parsedValue, setParsedValue] = useState('');

  const handleChange = (value) => {
    const result = value.replace(/\D|(\/)/g, '').slice(0, 4);
    setValue(result);

    const matches = result.match(/.{1,2}/g);

    if (!matches) {
      setParsedValue('');
    }

    let [first, second] = matches;

    // clamp to 1-12 for month number
    first = Math.max(1, Math.min(parseInt(first), 12)).toString();
    setParsedValue([first, second].join(' / '));
  };

  return (
    <TextField
      InputLabelProps={{ shrink: true }}
      {...props}
      value={parsedValue}
      onChange={(e) => handleChange(e.currentTarget.value)}
    />
  );
};

export const CreditCardCVC = (props) => {
  const [value, setValue] = useState('');

  const handleChange = (value) => {
    const result = value.replace(/\D/g, '').slice(0, 3);
    setValue(result);
  };

  return (
    <TextField
      InputLabelProps={{ shrink: true }}
      type='password'
      {...props}
      value={value}
      onChange={(e) => handleChange(e.currentTarget.value)}
    />
  );
};
