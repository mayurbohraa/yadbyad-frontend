import { useState } from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

export default function FieldHelp({ label, hint, InputProps = {}, select = false, ...props }) {
  const [open, setOpen] = useState(false);

  const helpButton = hint && (
    <InputAdornment position="end" sx={{ ml: 0.5 }}>
      <Tooltip title={hint} arrow placement="top" open={open} onClose={() => setOpen(false)}>
        <IconButton
          type="button"
          size="small"
          aria-label={`${label} format information`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onClick={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setOpen(false);
          }}
        >
          <Iconify icon="eva:info-outline" />
        </IconButton>
      </Tooltip>
    </InputAdornment>
  );

  return (
    <TextField
      {...props}
      label={label}
      select={select}
      InputProps={{
        ...InputProps,
        // Preserve existing controls, such as password visibility, before the help button.
        endAdornment: hint ? (
          <>
            {InputProps.endAdornment}
            {helpButton}
          </>
        ) : (
          InputProps.endAdornment
        ),
        sx: [
          ...(Array.isArray(InputProps.sx) ? InputProps.sx : [InputProps.sx || {}]),
          // The select arrow otherwise occupies the same right edge as the help button.
          ...(select && hint ? [{ '& .MuiSelect-icon': { right: 46 } }] : []),
        ],
      }}
    />
  );
}

FieldHelp.propTypes = {
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
  InputProps: PropTypes.object,
  select: PropTypes.bool,
};
