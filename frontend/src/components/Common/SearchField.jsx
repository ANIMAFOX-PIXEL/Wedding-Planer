import React, { useState, useEffect } from 'react';
import { func, string } from 'prop-types';

import {
  Container as MUIContainer,
  IconButton,
  TextField,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const SearchField = ({ handleMakeSearch, startingQuery }) => {
  const [query, setQuery] = useState(startingQuery);

  // Hacer busqueda cuando deje de teclear
  useEffect(() => {
    const delay = setTimeout(() => {
      handleMakeSearch(query);
    }, 1500);
    return () => clearTimeout(delay);
  }, [query]);

  const onChange = (e) => setQuery(e.currentTarget.value);

  // Hacer busqueda cuando se presione enter
  const onKeyDown = (e) => e === 'Enter' && handleMakeSearch(query);

  return (
    <TextField
      variant='filled'
      label='Search'
      value={query}
      onChange={onChange}
      onKeyDown={onKeyDown}
      InputProps={{
        style: {
          padding: '0.5rem',
        },
        endAdornment: (
          <IconButton>
            <SearchIcon />
          </IconButton>
        ),
      }}
      margin='dense'
      fullWidth
    />
  );
};

SearchField.propTypes = {
  handleMakeSearch: func.isRequired,
  startingQuery: string,
};

SearchField.defaultProps = {
  startingQuery: '',
};

export default SearchField;
