import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { alpha } from '@mui/material';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { RouterLink } from 'src/routes/components';

import Routes from 'src/api/apiRoutes';
import { yadbyadPost } from 'src/api/api.service';
import ChangePasswordForm from 'src/forms/change_password/change-password-form';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

export default function Profile() {
  const [ReadOnly, setReadOnly] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const history = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [_id, setId] = useState('');

  const [fullName, setFullName] = useState('');

  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');

  const [tel, setTel] = useState('');

  const [gender, setGender] = useState('');

  const [studentID, setStudentID] = useState('');

  const [role, setRole] = useState('');

  useEffect(() => {
    const user_details = JSON.parse(localStorage.getItem('login_status'));

    setId(user_details._id);
    setFullName(user_details.fullName);
    setUsername(user_details.username);
    setStudentID(user_details.studentID);
    setEmail(user_details.email);
    setTel(user_details.mobileNumber);
    setGender(user_details.gender);
    setRole(user_details.role);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setReadOnly(!ReadOnly);

    const body = {
      fullName: fullName.trim(),
      username: username.trim(),
      // studentID: studentID.trim(),
      email: email.trim(),
      mobileNumber: tel.trim(),
      gender: gender.trim(),
      // role: role.trim(),
    };

    const response = await yadbyadPost(Routes.editProfile(_id), body);

    if (response) {
      await localStorage.setItem('login_status', JSON.stringify(response.user));
      setTimeout(() => {
        history(0);
      }, '500');
    }
  };

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

  return (
    <>
      <Box sx={{ bgcolor: (theme) => alpha(theme.palette.grey[1000], 1) }}>
        <Logo sx={{ mt: 2, mb: 2, ml: 4 }} />
      </Box>

      <Box sx={{ m: 0 }}>
        <Card sx={{ p: 4 }}>
          <CardHeader
            sx={{
              pb: 5,
            }}
            title={`${
              ReadOnly
                ? 'View Profile'
                : "Edit Profile | Note: You can't update Student ID and Role"
            } `}
          />

          <Stack>
            <Grid container>
              <Grid xs={12} md={5} my={2} mx={4}>
                <Stack>
                  <TextField
                    type="text"
                    id="fullname"
                    name="fullname"
                    label="Name"
                    value={fullName}
                    autoComplete="off"
                    inputProps={{
                      readOnly: ReadOnly,
                    }}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Stack>
              </Grid>

              <Grid xs={12} md={5} my={2} mx={4}>
                <Stack>
                  <TextField
                    type="text"
                    id="username"
                    name="username"
                    label="Username"
                    autoComplete="off"
                    value={username}
                    helperText="Username Format : FS202312345"
                    inputProps={{
                      readOnly: ReadOnly,
                    }}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Stack>
              </Grid>

              <Grid xs={12} md={5} my={2} mx={4}>
                <Stack>
                  <TextField
                    type="text"
                    id="studentID"
                    name="studentID"
                    label="Student ID"
                    autoComplete="off"
                    value={studentID}
                    readOnly
                    onChange={(e) => setStudentID(e.target.value)}
                  />
                </Stack>
              </Grid>

              <Grid xs={12} md={5} my={2} mx={4}>
                <Stack>
                  <TextField
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    value={email}
                    autoComplete="off"
                    inputProps={{
                      readOnly: ReadOnly,
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    helperText="Email Format : abc@qu.edu.qa"
                  />
                </Stack>
              </Grid>

              <Grid xs={12} md={5} my={2} mx={4}>
                <Stack>
                  <TextField
                    type="tel"
                    id="tel"
                    name="tel"
                    label="Mobile Number"
                    // placeholder={validTel}
                    value={tel}
                    autoComplete="off"
                    inputProps={{
                      readOnly: ReadOnly,
                    }}
                    onChange={(e) => setTel(e.target.value)}
                    helperText="Mobile Number Format : +974 1234 5678"
                  />
                </Stack>
              </Grid>

              <Grid xs={12} md={5} my={2} mx={4}>
                <Stack>
                  <FormLabel id="demo-row-radio-buttons-group-label" required>
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <FormControlLabel
                      checked={gender === 'female'}
                      value="female"
                      control={<Radio />}
                      label="Female"
                      inputProps={{
                        readOnly: ReadOnly,
                      }}
                    />
                    <FormControlLabel
                      checked={gender === 'male'}
                      value="male"
                      control={<Radio />}
                      label="Male"
                      inputProps={{
                        readOnly: ReadOnly,
                      }}
                    />
                  </RadioGroup>
                </Stack>
              </Grid>

              <Grid xs={12} md={5} my={2} mx={4}>
                <Stack>
                  <FormLabel id="demo-row-radio-buttons-group-label" required>
                    Role
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <FormControlLabel
                      checked={role === 'special need student'}
                      value="special need student"
                      control={<Radio />}
                      label="Special Need Student"
                      readOnly
                    />
                    <FormControlLabel
                      checked={role === 'part time student'}
                      value="part time student"
                      control={<Radio />}
                      label="Part Time Student"
                      readOnly
                    />
                    <FormControlLabel
                      checked={role === 'admin'}
                      value="admin"
                      control={<Radio />}
                      label="Admin"
                      readOnly
                    />
                  </RadioGroup>
                </Stack>
              </Grid>
            </Grid>
          </Stack>

          <Stack spacing={2} direction="row" justifyContent="flex-end" alignItems="center">
            <Button href="/dashboard" variant="contained" component={RouterLink}>
              Go to Home
            </Button>

            <Button variant="contained" color="primary" onClick={handleOpen}>
              Change Password
            </Button>

            {ReadOnly ? (
              <Button variant="contained" color="primary" onClick={() => setReadOnly(!ReadOnly)}>
                Edit Profile
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Save Details
              </Button>
            )}
          </Stack>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Scrollbar>
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Change Password
                </Typography>
                <hr />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <ChangePasswordForm handleClose={handleClose} />
                </Typography>
              </Box>
            </Scrollbar>
          </Modal>
        </Card>
      </Box>
    </>
  );
}
