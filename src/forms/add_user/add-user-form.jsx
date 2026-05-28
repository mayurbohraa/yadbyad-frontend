import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import RadioGroup from '@mui/material/RadioGroup';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import Routes from 'src/api/apiRoutes';
import { yadbyadPost } from 'src/api/api.service';

import Iconify from 'src/components/iconify';

export default function AddUserForm({ handleClose }) {
  const history = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const NAME_REGEX = /^[a-zA-Z" "]{4,80}$/;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const USERNAME_REGEX = /^[a-zA-Z0-9]{4,12}$/;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const STUDENTID_REGEX = /^([?=.*[0-9]){4,9}$/;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[qu]+(?:\.[edu]+)+(?:\.[qa]+)*$/;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const TEL_REGEX = /^([?=.*[+974])([?=.*[0-9]){11,11}$/;

  const [fullName, setFullName] = useState('');
  const [validFullName, setValidFullName] = useState(false);

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);

  const [studentID, setStudentID] = useState('');
  const [validStudentID, setValidStudentID] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [tel, setTel] = useState('');
  const [validTel, setValidTel] = useState(false);

  const [gender, setGender] = useState('');
  const [, setValidGender] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [role, setRole] = useState('');
  const [, setValidRole] = useState(false);

  useEffect(() => {
    const Fullname = NAME_REGEX.test(fullName);
    const Username = USERNAME_REGEX.test(username);
    const StudentID = STUDENTID_REGEX.test(studentID);
    const Email = EMAIL_REGEX.test(email);
    const Tel = TEL_REGEX.test(tel);
    const Gender = gender;
    const Password = PASSWORD_REGEX.test(password);
    const Role = role;
    setValidFullName(Fullname);
    setValidUsername(Username);
    setValidStudentID(StudentID);
    setValidEmail(Email);
    setValidTel(Tel);
    setValidGender(Gender);
    setValidRole(Role);
    setValidPassword(Password);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [
    NAME_REGEX,
    USERNAME_REGEX,
    STUDENTID_REGEX,
    fullName,
    username,
    studentID,
    email,
    tel,
    gender,
    EMAIL_REGEX,
    TEL_REGEX,
    role,
    PASSWORD_REGEX,
    password,
    matchPassword,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      fullName: fullName.trim(),
      username: username.trim(),
      studentID: studentID.trim(),
      email: email.trim(),
      mobileNumber: tel.trim(),
      gender: gender.trim(),
      role: role.trim(),
      password: password.trim(),
    };

    if (
      body.fullName === '' ||
      body.username === '' ||
      body.studentID === '' ||
      body.email === '' ||
      body.mobileNumber === '' ||
      body.gender === '' ||
      body.role === '' ||
      body.password === '' ||
      matchPassword === ''
    ) {
      toast.error('Complete all fields.', {
        icon: '⚠️',
        style: {
          background: '#3f7bf2',
          color: '#fff',
        },
      });
    } else {
      const response = await yadbyadPost(Routes.signup, body);

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
            type="text"
            id="fullname"
            name="fullname"
            label="Name"
            placeholder="Name"
            autoComplete="off"
            required
            onChange={(e) => setFullName(e.target.value)}
            aria-invalid={validFullName ? 'false' : 'true'}
          />

          <span className={validFullName ? 'valid3' : 'hide3'}>
            <Iconify icon="mdi:tick-circle" />
          </span>
          <span className={validFullName || !fullName ? 'hide3' : 'invalid3'}>
            <Iconify icon="ep:warning-filled" />
          </span>
        </Stack>

        <Stack>
          <TextField
            type="text"
            id="username"
            name="username"
            label="Username"
            autoComplete="off"
            placeholder="Username"
            helperText="Username Format : FS202312345 (contains alphabets and digits)"
            required
            onChange={(e) => setUsername(e.target.value)}
            aria-invalid={validUsername ? 'false' : 'true'}
          />

          <span className={validUsername ? 'valid3' : 'hide3'}>
            <Iconify icon="mdi:tick-circle" />
          </span>
          <span className={validUsername || !username ? 'hide3' : 'invalid3'}>
            <Iconify icon="ep:warning-filled" />
          </span>
        </Stack>

        <Stack>
          <TextField
            type="text"
            id="studentID"
            name="studentID"
            label="Student ID"
            autoComplete="off"
            placeholder="Student ID"
            helperText="StudentID Format : 201808178 [It is of 9 Digits]"
            required
            onChange={(e) => setStudentID(e.target.value)}
            aria-invalid={validStudentID ? 'false' : 'true'}
          />

          <span className={validStudentID ? 'valid3' : 'hide3'}>
            <Iconify icon="mdi:tick-circle" />
          </span>
          <span className={validStudentID || !studentID ? 'hide3' : 'invalid3'}>
            <Iconify icon="ep:warning-filled" />
          </span>
        </Stack>

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
            type="tel"
            id="tel"
            name="tel"
            label="Mobile Number"
            placeholder="Mobile Number"
            autoComplete="off"
            helperText="Mobile Number Format : +974 1234 5678"
            required
            onChange={(e) => setTel(e.target.value)}
            aria-invalid={validTel ? 'false' : 'true'}
          />

          <span className={validTel ? 'valid3' : 'hide3'}>
            <Iconify icon="mdi:tick-circle" />
          </span>
          <span className={validTel || !tel ? 'hide3' : 'invalid3'}>
            <Iconify icon="ep:warning-filled" />
          </span>
        </Stack>

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
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </Stack>

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
              value="special need student"
              control={<Radio />}
              label="Special Need Student"
            />
            <FormControlLabel
              value="part time student"
              control={<Radio />}
              label="Part Time Student"
            />
          </RadioGroup>
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

AddUserForm.propTypes = { handleClose: PropTypes.func };
