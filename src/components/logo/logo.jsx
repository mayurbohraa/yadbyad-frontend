import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';

const Logo = forwardRef(({ sx, ...props }, ref) => (
  <Box
    ref={ref}
    component="img"
    src="/assets/logo_1.svg"
    alt="Yad Byad"
    sx={{ width: 180, height: 'auto', display: 'block', ...sx }}
    {...props}
  />
));

Logo.propTypes = { sx: PropTypes.object };

export default Logo;
