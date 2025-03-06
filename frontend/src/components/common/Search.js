import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export default function Search({ value, onChange }) {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '100%' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Ask a question…"
        sx={{ flexGrow: 1 }}
        value={value}
        onChange={onChange}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}