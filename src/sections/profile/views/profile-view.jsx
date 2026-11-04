import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { readAccount, saveAccount } from 'src/utils/account';

import axios from 'src/api/axios';
import ChangePasswordForm from 'src/forms/change_password/change-password-form';

const profileFields = [
  ['fullName', 'Full name', 'text', 'name'],
  ['username', 'Username', 'text', 'username'],
  ['email', 'Email', 'email', 'email'],
  ['mobileNumber', 'Mobile number', 'tel', 'tel'],
];

export default function Profile() {
  const [account, setAccount] = useState(() => readAccount());
  const [form, setForm] = useState(() => readAccount());
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [code, setCode] = useState('');
  const [codeBusy, setCodeBusy] = useState(false);
  const [codeError, setCodeError] = useState('');

  const save = async (event) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const { fullName, username, email, mobileNumber, gender } = form;
      const { data } = await axios.post(`/auth/users/profile/${account._id}`, {
        fullName,
        username,
        email,
        mobileNumber,
        gender,
      });
      saveAccount(data.data.user);
      setAccount(data.data.user);
      setForm(data.data.user);
      setEditing(false);
      toast.success(data.message || 'Profile updated.');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save your profile. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const revealCode = async () => {
    if (code) {
      setCode('');
      return;
    }
    setCodeBusy(true);
    setCodeError('');
    try {
      const { data } = await axios.get('/auth/recovery/code');
      setCode(data.data.recoveryCode);
    } catch (err) {
      setCodeError(
        err.response?.data?.message || 'Unable to load your recovery code. Please try again.'
      );
    } finally {
      setCodeBusy(false);
    }
  };

  if (!account) return null;

  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography component="h1" variant="h4">
          My Profile
        </Typography>
        <Button component={RouterLink} to="/dashboard">
          Back to dashboard
        </Button>
      </Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Card sx={{ p: { xs: 2.5, sm: 4 } }}>
            <Stack component="form" spacing={3} onSubmit={save}>
              <Box>
                <Typography component="h2" variant="h6">
                  Personal details
                </Typography>
                <Typography color="text.secondary">
                  Keep your account information up to date.
                </Typography>
              </Box>
              {error && <Alert severity="error">{error}</Alert>}
                      <Box>
                <Grid container spacing={2}>
                  {profileFields.map(([name, label, type, autoComplete]) => (
                    <Grid item xs={12} sm={6} key={name}>
                      <TextField
                        fullWidth
                        required
                        label={label}
                        type={type}
                        autoComplete={autoComplete}
                        value={form[name] || ''}
                        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                        InputProps={{ readOnly: !editing }}
                        inputProps={
                          name === 'username'
                            ? { pattern: '[A-Za-z0-9]{4,30}', maxLength: 30 }
                            : { maxLength: name === 'email' ? 254 : 100 }
                        }
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      select
                      label="Gender"
                      value={form.gender || ''}
                      disabled={!editing}
                      onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    >
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Student ID"
                      value={account.studentID || ''}
                      InputProps={{ readOnly: true }}
                      helperText="Your account identifier cannot be changed here."
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Account role"
                      value={account.role}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Stack direction="row" spacing={2}>
                {editing ? (
                  <>
                    <LoadingButton type="submit" variant="contained" loading={busy}>
                      Save changes
                    </LoadingButton>
                    <Button
                      disabled={busy}
                      onClick={() => {
                        setForm(account);
                        setEditing(false);
                        setError('');
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setEditing(true);
                                      }}
                  >
                    Edit profile
                  </Button>
                )}
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Stack spacing={3}>
            <Card sx={{ p: { xs: 2.5, sm: 4 } }}>
              <Stack spacing={2}>
                <Typography component="h2" variant="h6">
                  Account recovery
                </Typography>
                <Typography color="text.secondary">
                  Save this code privately to reset your password.
                </Typography>
                {codeError && <Alert severity="error">{codeError}</Alert>}
                {code && (
                  <Box
                    component="output"
                    aria-label="Your recovery code"
                    sx={{
                      fontFamily: 'monospace',
                      fontSize: { xs: 16, sm: 20 },
                      overflowWrap: 'anywhere',
                      bgcolor: 'action.hover',
                      borderRadius: 1,
                      p: 2,
                      userSelect: 'all',
                    }}
                  >
                    {code}
                  </Box>
                )}
                <LoadingButton
                  loading={codeBusy}
                  variant="outlined"
                  onClick={revealCode}
                  aria-expanded={!!code}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  {code ? 'Hide recovery code' : 'Reveal recovery code'}
                </LoadingButton>
              </Stack>
            </Card>
            <Card sx={{ p: { xs: 2.5, sm: 4 } }}>
              <Typography component="h2" variant="h6" sx={{ mb: 3 }}>
                Change password
              </Typography>
              <ChangePasswordForm />
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
