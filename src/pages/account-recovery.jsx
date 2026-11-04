import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import RecoveryRequests from 'src/sections/account-recovery/recovery-requests';

export default function AccountRecoveryPage() {
  return (
    <Container maxWidth="xl">
      <Helmet>
        <title>Account Recovery | Yad Byad</title>
      </Helmet>
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        Account recovery
      </Typography>
      <RecoveryRequests />
    </Container>
  );
}
