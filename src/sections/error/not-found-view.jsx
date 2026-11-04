import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Logo from 'src/components/logo';

export default function NotFoundView() {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      <Box component="header" sx={{ bgcolor: '#164231', px: { xs: 3, md: 5 }, py: 2 }}>
        <Logo sx={{ width: 150 }} />
      </Box>
      <Stack
        component="main"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ flex: 1, textAlign: 'center', px: 3, py: 4 }}
      >
        <Box
          component="img"
          src="/assets/illustrations/illustration_404.svg"
          alt=""
          sx={{ width: '100%', maxWidth: 280, maxHeight: '34dvh', objectFit: 'contain' }}
        />
        <Typography component="h1" variant="h4">
          Page not found
        </Typography>
        <Typography color="text.secondary">
          The link may be outdated or the address may be incorrect.
        </Typography>
        <Button component={Link} to="/" replace variant="contained" color="inherit" size="large">
          Go to home
        </Button>
      </Stack>
    </Box>
  );
}
