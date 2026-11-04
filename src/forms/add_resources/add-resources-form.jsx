import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import React, { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Routes from 'src/api/apiRoutes';
import { yadbyadPost } from 'src/api/api.service';

export default function AddResourcesForm({ handleClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setURL] = useState('');

  useEffect(() => {
    setTitle(title);
    setDescription(description);
    setURL(url);
  }, [title, description, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      title: title.trim(),
      description: description.trim(),
      url: url.trim(),
    };

    if (body.title === '' || body.description === '' || body.url === '') {
      toast.error('Complete all fields.', {
        icon: '⚠️',
        style: {
          background: '#3f7bf2',
          color: '#fff',
        },
      });
    } else {
      const response = await yadbyadPost(Routes.createResource, body);

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
          name="Title"
          label="Resource Title"
          placeholder="Resource Title"
          required
          autoComplete="off"
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          type="text"
          name="Description"
          label="Resource Description"
          placeholder="Resource Description"
          required
          autoComplete="off"
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          type="url"
          name="url"
          label="Resource URL"
          placeholder="Resource URL"
          required
          autoComplete="off"
          onChange={(e) => setURL(e.target.value)}
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

AddResourcesForm.propTypes = { handleClose: PropTypes.func };
