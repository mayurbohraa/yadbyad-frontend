import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import React, { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Routes from 'src/api/apiRoutes';
import { yadbyadPost } from 'src/api/api.service';

export default function ComplainReplyForm({ handleClose, id }) {
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    setReplyMessage(replyMessage);
  }, [replyMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      replyMessage: replyMessage.trim(),
    };

    if (body.replyMessage === '') {
      toast.error('Complete all fields.', {
        icon: '⚠️',
        style: {
          background: '#3f7bf2',
          color: '#fff',
        },
      });
    } else {
      const response = await yadbyadPost(Routes.replyComplain(id), body);

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
          name="replyMessage"
          label="Reply"
          placeholder="Reply"
          multiline
          required
          helperText="Write your reply regards to complain."
          autoComplete="off"
          onChange={(e) => setReplyMessage(e.target.value)}
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

ComplainReplyForm.propTypes = {
  handleClose: PropTypes.func,
  id: PropTypes.func,
};
