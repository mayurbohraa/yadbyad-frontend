import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Routes from 'src/api/apiRoutes';
import { yadbyadPost } from 'src/api/api.service';

import Iconify from 'src/components/iconify';

export default function ForgotPasswordForm({ handleClose }) {
  const history = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[qu]+(?:\.[edu]+)+(?:\.[qa]+)*$/;

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  useEffect(() => {
    const Email = EMAIL_REGEX.test(email);
    const Password = PASSWORD_REGEX.test(password);
    setValidEmail(Email);
    setValidPassword(Password);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [email, EMAIL_REGEX, PASSWORD_REGEX, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email: email.trim(),
      newPassword: password.trim(),
    };

    if (body.email === '' || body.newPassword === '' || matchPassword === '') {
      toast.error('Complete all fields.', {
        icon: '⚠️',
        style: {
          background: '#3f7bf2',
          color: '#fff',
        },
      });
    } else {
      const response = await yadbyadPost(Routes.forgotPassword, body);
      if (response) {
        handleClose();
        setTimeout(() => {
          history(0);
        }, '500');
      }
    }
  };

  return (
    <Box>
      <Stack spacing={3}>
        <Stack>
          <TextField
            type="email"
            id="email"
            name="email"
            label="Email"
            placeholder="Email"
            autoComplete="off"
            helperText="Email Format : abc@qu.edu.qa"
            required
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={validEmail ? 'false' : 'true'}
          />

          <span className={validEmail ? 'valid3' : 'hide3'}>
            <Iconify icon="mdi:tick-circle" />
          </span>
          <span className={validEmail || !email ? 'hide3' : 'invalid3'}>
            <Iconify icon="ep:warning-filled" />
          </span>
        </Stack>

        <Stack>
          <TextField
            name="password"
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            placeholder="Password"
            required
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            aria-invalid={validPassword ? 'false' : 'true'}
            helperText="Password should contains alphabets, digits and characters."
          />

          <span className={validPassword ? 'valid4' : 'hide4'}>
            <Iconify icon="mdi:tick-circle" />
          </span>
          <span className={validPassword || !password ? 'hide4' : 'invalid4'}>
            <Iconify icon="ep:warning-filled" />
          </span>
        </Stack>

        <Stack>
          <TextField
            name="confirm_password"
            id="confirm_password"
            label="Confirm Password"
            onChange={(e) => setMatchPassword(e.target.value)}
            autoComplete="off"
            placeholder="Confirm Password"
            helperText="Match your password"
            required
            type={showConfirmPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            aria-invalid={validMatch ? 'false' : 'true'}
          />
          <span className={validMatch && matchPassword ? 'valid4' : 'hide4'}>
            <Iconify icon="mdi:tick-circle" />
          </span>
          <span className={validMatch || !matchPassword ? 'hide4' : 'invalid4'}>
            <Iconify icon="ep:warning-filled" />
          </span>
        </Stack>
      </Stack>

      <Stack
        spacing={1}
        direction="row"
        sx={{ mt: 4 }}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>

        <Button onClick={() => handleClose()} variant="contained" color="error">
          Close
        </Button>
      </Stack>
    </Box>
  );
}

ForgotPasswordForm.propTypes = { handleClose: PropTypes.func };
