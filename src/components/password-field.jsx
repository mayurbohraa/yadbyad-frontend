import { useState } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';
import FieldHelp from 'src/components/field-help';

export default function PasswordField({ label = 'Password', hint, InputProps = {}, ...props }) {
  const [visible, setVisible] = useState(false);
  return (
    <FieldHelp
      fullWidth
      required
      label={label}
      hint={hint}
      type={visible ? 'text' : 'password'}
      {...props}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <>
            {InputProps.endAdornment}
            <InputAdornment position="end">
              <IconButton
                type="button"
                size="small"
                aria-label={`${visible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
                aria-pressed={visible}
                onClick={() => setVisible(!visible)}
                edge={hint ? false : 'end'}
              >
                <Iconify icon={visible ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
              </IconButton>
            </InputAdornment>
          </>
        ),
      }}
    />
  );
}

PasswordField.propTypes = {
  label: PropTypes.string,
  hint: PropTypes.string,
  InputProps: PropTypes.object,
};
