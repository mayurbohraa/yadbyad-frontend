import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { saveAccount, PASSWORD_HELP, validPassword } from 'src/utils/account';

import axios from 'src/api/axios';

import PasswordField from 'src/components/password-field';

export default function ChangePasswordForm({ handleClose }) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    if (!validPassword(newPassword) || newPassword !== confirmation) {
      setError(newPassword !== confirmation ? 'Passwords do not match.' : PASSWORD_HELP);
      return;
    }
    setBusy(true);
    setError('');
    try {
      const { data } = await axios.post('/auth/users/changePassword', { password, newPassword });
      saveAccount(data.data.user, data.data.token);
      setPassword('');
      setNewPassword('');
      setConfirmation('');
      toast.success(data.message || 'Password changed.');
      if (handleClose) handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to change your password. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Stack component="form" spacing={3} onSubmit={submit}>
      {error && <Alert severity="error">{error}</Alert>}
      <PasswordField
        label="Current password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordField
        label="New password"
        autoComplete="new-password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        helperText={PASSWORD_HELP}
        inputProps={{ maxLength: 72 }}
      />
      <PasswordField
        label="Confirm new password"
        autoComplete="new-password"
        value={confirmation}
        onChange={(e) => setConfirmation(e.target.value)}
        error={!!confirmation && newPassword !== confirmation}
        helperText={confirmation && newPassword !== confirmation ? 'Passwords do not match.' : ''}
      />
      <LoadingButton
        type="submit"
        variant="contained"
        loading={busy}
        sx={{ alignSelf: 'flex-start' }}
      >
        Change password
      </LoadingButton>
    </Stack>
  );
}

ChangePasswordForm.propTypes = { handleClose: PropTypes.func };
