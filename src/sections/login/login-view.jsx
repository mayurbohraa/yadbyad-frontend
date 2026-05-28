import toast from 'react-hot-toast';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import Routes from 'src/api/apiRoutes';
import { bgGradient } from 'src/theme/css';
import { yadbyadPost } from 'src/api/api.service';
import { ForgotPasswordForm } from 'src/forms/forgot_pasword';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const USERNAME_REGEX = /^[a-zA-Z0-9]{4,12}$/;

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    const Username = USERNAME_REGEX.test(username);
    const Password = PASSWORD_REGEX.test(password);
    setValidUsername(Username);
    setValidPassword(Password);
  }, [username, USERNAME_REGEX, PASSWORD_REGEX, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { username: username.trim(), password: password.trim() };

    if (body.username === '' || body.password === '') {
      toast.error('Complete all fields.', {
        icon: '⚠️',
        style: {
          background: '#3f7bf2',
          color: '#fff',
        },
      });
    } else {
      const response = await yadbyadPost(Routes.login, body);

      if (response) {
        localStorage.setItem('login_status', JSON.stringify(response.user));
        localStorage.setItem('token_status', response.token);

        router.push('/dashboard');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  // username popover

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // password popover

  const [anchorE2, setAnchorE2] = React.useState(null);

  const handleClick2 = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorE2(null);
  };

  const open2 = Boolean(anchorE2);
  const id2 = open2 ? 'simple-popover' : undefined;

  // forgot password model

  const [open3, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose3 = () => setOpen(false);

  const style = {
    marginTop: '2%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 500,
    // maxHeight: 640,
    marginBottom: '2%',
    bgcolor: 'background.paper',
    borderRadius: 0.5,
    boxShadow: 24,
    p: 4,
  };

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Stack>
          <TextField
            id="username"
            name="username"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            autoComplete="off"
            aria-invalid={validUsername ? 'false' : 'true'}
            placeholder="Username"
            required
          />

          <span className={validUsername ? 'valid' : 'hide'}>
            <Iconify icon="mdi:tick-circle" />
          </span>

          <span className={validUsername || !username ? 'hide' : 'invalid'}>
            <Iconify
              icon="ep:warning-filled"
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            />

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Typography sx={{ p: 2 }}>
                Username Format : FS202312345 <br /> (contains alphabets and digits){' '}
              </Typography>
            </Popover>
          </span>
        </Stack>

        <Stack>
          <TextField
            name="password"
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            autoComplete="off"
            aria-invalid={validPassword ? 'false' : 'true'}
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
          />

          <span className={validPassword ? 'valid2' : 'hide2'}>
            <Iconify icon="mdi:tick-circle" />
          </span>
          <span className={validPassword || !password ? 'hide2' : 'invalid2'}>
            <Iconify
              icon="ep:warning-filled"
              aria-describedby={id2}
              variant="contained"
              onClick={handleClick2}
            />

            <Popover
              id={id2}
              open={open2}
              anchorEl={anchorE2}
              onClose={handleClose2}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Typography sx={{ p: 2 }}>
                Password should contains alphabets, <br />
                digits and characters.
              </Typography>
            </Popover>
          </span>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover" sx={{ cursor: 'pointer' }} onClick={handleOpen}>
          Forgot password?
        </Link>

        <Modal
          open={open3}
          onClose={handleClose3}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Scrollbar>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Forgot Password
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <ForgotPasswordForm handleClose={handleClose3} />
              </Typography>
            </Box>
          </Scrollbar>
        </Modal>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSubmit}
      >
        Login
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0),
          imgUrl: '/assets/background/loginbg.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{ mb: 4 }}>
            Sign in to Yad Byad
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
