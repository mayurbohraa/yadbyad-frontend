import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';

import { PASSWORD_HELP, validPassword } from 'src/utils/account';

import axios from 'src/api/axios';
import AuthLayout from 'src/layouts/auth';

import FieldHelp from 'src/components/field-help';
import PasswordField from 'src/components/password-field';

const initial = {
  fullName: '',
  username: '',
  studentID: '',
  email: '',
  mobileNumber: '',
  gender: '',
  role: '',
  password: '',
  confirmPassword: '',
};

export default function SignupPage() {
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [complete, setComplete] = useState(false);
  const field = (name) => ({
    id: `signup-${name}`,
    value: form[name],
    onChange: (event) => setForm({ ...form, [name]: event.target.value }),
  });

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    if (!validPassword(form.password)) {
      setError(PASSWORD_HELP);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const body = { ...form };
      delete body.confirmPassword;
      await axios.post('/auth/signup', body);
      setForm(initial);
      setComplete(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create your account. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout fixedHeight title="Create your account">
      <Helmet>
        <title>Create Account | Yad Byad</title>
      </Helmet>
      {complete ? (
        <Stack spacing={3}>
          <Alert severity="success">Account created. Sign in to save your recovery code.</Alert>
          <Link component={RouterLink} to="/">
            Continue to sign in
          </Link>
        </Stack>
      ) : (
        <Box
          component="form"
          onSubmit={submit}
          sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2, flexShrink: 0 }}>
              {error}
            </Alert>
          )}
          <Stack
            spacing={3}
            role="region"
            aria-label="Signup fields"
            tabIndex={0}
            sx={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
              overscrollBehavior: 'contain',
              scrollbarGutter: 'stable',
              px: 0.5,
              py: 1,
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: -2,
                borderRadius: 1,
              },
            }}
          >
            <FieldHelp
              required
              fullWidth
              autoComplete="name"
              inputProps={{ maxLength: 100 }}
              {...field('fullName')}
              label="Full name"
              hint="Enter your full name, up to 100 characters. Example: Sara Ahmed."
            />
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FieldHelp
                    required
                    fullWidth
                    autoComplete="username"
                    inputProps={{ pattern: '[A-Za-z0-9]{4,30}', maxLength: 30 }}
                    {...field('username')}
                    label="Username"
                    hint="Use 4–30 letters and numbers, with no spaces or symbols. Example: FS202312345."
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FieldHelp
                    required
                    fullWidth
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]{4,20}', maxLength: 20 }}
                    {...field('studentID')}
                    label="Student ID"
                    hint="Enter 4–20 digits without spaces. Example: 201808178."
                  />
                </Grid>
              </Grid>
            </Box>
            <FieldHelp
              required
              fullWidth
              type="email"
              autoComplete="email"
              inputProps={{ maxLength: 254 }}
              {...field('email')}
              label="Email"
              hint="Enter a valid email address. Example: sara@qu.edu.qa."
            />
            <FieldHelp
              required
              fullWidth
              type="tel"
              autoComplete="tel"
              inputProps={{ maxLength: 25 }}
              {...field('mobileNumber')}
              label="Mobile number"
              hint="Include your country code. Example: +974 1234 5678. Digits, spaces, parentheses, and hyphens are accepted (7–25 characters)."
            />
            <FieldHelp
              required
              select
              fullWidth
              {...field('gender')}
              label="Gender"
              hint="Select your gender from the available options."
            >
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
            </FieldHelp>
            <FieldHelp
              required
              select
              fullWidth
              {...field('role')}
              label="Student role"
              hint="Choose Special Needs Student to request support, or Part-time Student to provide support."
            >
              <MenuItem value="special need student">Special Needs Student</MenuItem>
              <MenuItem value="part time student">Part-time Student</MenuItem>
            </FieldHelp>
            <PasswordField
              autoComplete="new-password"
              inputProps={{ maxLength: 72 }}
              {...field('password')}
              label="Password"
              hint={PASSWORD_HELP}
            />
            <PasswordField
              autoComplete="new-password"
              error={!!form.confirmPassword && form.password !== form.confirmPassword}
              helperText={
                form.confirmPassword && form.password !== form.confirmPassword
                  ? 'Passwords do not match.'
                  : ''
              }
              {...field('confirmPassword')}
              label="Confirm password"
              hint="Enter the same password again, including uppercase letters and symbols."
            />
          </Stack>
          <Stack spacing={2} sx={{ pt: 3, flexShrink: 0 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              color="inherit"
              size="large"
              loading={busy}
            >
              Create account
            </LoadingButton>
            <Link component={RouterLink} to="/" textAlign="center">
              Already have an account? Sign in
            </Link>
          </Stack>
        </Box>
      )}
    </AuthLayout>
  );
}
