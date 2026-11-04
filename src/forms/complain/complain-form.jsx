import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import React, { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Routes from 'src/api/apiRoutes';
import { yadbyadPost } from 'src/api/api.service';

export default function ComplainForm({ handleClose }) {
  const [subject, setSubject] = useState('');

  const [message, setMessage] = useState('');

  useEffect(() => {
    setSubject(subject);
    setMessage(message);
  }, [subject, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      subject: subject.trim(),
      message: message.trim(),
    };

    if (body.subject === '' || body.message === '') {
      toast.error('Complete all fields.', {
        icon: '⚠️',
        style: {
          background: '#3f7bf2',
          color: '#fff',
        },
      });
    } else {
      const response = await yadbyadPost(Routes.submitComplain, body);

      if (response) {
        handleClose();
      }
    }
  };

  return (
    <Box>
      <Stack spacing={3}>
        <TextField
          type="text"
          name="subject"
          label="Subject"
          placeholder="Subject"
          required
          helperText="Complain Subject."
          autoComplete="off"
          onChange={(e) => setSubject(e.target.value)}
        />

        <TextField
          type="text"
          name="message"
          label="Message"
          placeholder="Message"
          multiline
          required
          helperText="Complain Message."
          autoComplete="off"
          onChange={(e) => setMessage(e.target.value)}
        />
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

ComplainForm.propTypes = { handleClose: PropTypes.func };
