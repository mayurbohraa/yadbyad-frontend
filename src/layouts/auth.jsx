import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Logo from 'src/components/logo';

export default function AuthLayout({ title, children, fixedHeight = false }) {
  return (
    <Box
      sx={{
        height: '100dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        bgcolor: 'background.default',
      }}
    >
      <Box
        component="aside"
        sx={{
          width: { xs: '100%', md: '50%' },
          flexShrink: 0,
          bgcolor: '#062b23',
          backgroundImage:
            'linear-gradient(#061e1866, #061e1899), url(/assets/background/loginbg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          p: { xs: 2, md: 5, lg: 7 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Logo sx={{ width: { xs: 140, md: 180 } }} />
        <Stack
          spacing={{ md: 1.75, lg: 2.5 }}
          sx={{
            display: { xs: 'none', md: 'flex' },
            flex: 1,
            minHeight: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src="/assets/illustrations/peer-study.svg"
            alt="Two students sharing study materials at a confirmed peer support session, one using a wheelchair"
            sx={{ width: '100%', maxWidth: 490, maxHeight: '54dvh', objectFit: 'contain' }}
          />
          <Typography
            component="p"
            variant="h5"
            sx={{ color: 'common.white', textAlign: 'center', fontWeight: 650, textWrap: 'balance' }}
          >
            Peer support for student success.
          </Typography>
        </Stack>
      </Box>
      <Box
        component="main"
        sx={{
          width: { xs: '100%', md: '50%' },
          minHeight: 0,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: fixedHeight ? 'hidden' : 'auto',
          p: { xs: 2, sm: 3, lg: 5 },
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 560,
            mx: 'auto',
            my: fixedHeight ? 0 : 'auto',
            p: { xs: 2.5, sm: 4 },
            ...(fixedHeight && { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }),
          }}
        >
          <Typography component="h1" variant="h4" sx={{ mb: 3, flexShrink: 0 }}>
            {title}
          </Typography>

          {children}
        </Card>
      </Box>
    </Box>
  );
}

AuthLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  fixedHeight: PropTypes.bool,
};
