import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import React, { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Routes from 'src/api/apiRoutes';
import { yadbyadMultiPartPost } from 'src/api/api.service';

export default function SubmitReportForm({ handleClose, id }) {
  const [filename, setFilename] = useState('');
  const [description, setDescription] = useState('');
  const [report, setReport] = useState('');

  useEffect(() => {
    setFilename(filename);
    setDescription(description);
    setReport(report);
  }, [filename, description, report]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (report?.size > 4 * 1024 * 1024) {
      toast.error('Report files must be 4 MB or smaller.');
      return;
    }

    const body = new FormData();
    body.append('filename', filename);
    body.append('fileDescription', description);
    body.append('file', report);

    if (!body.get('filename') || !body.get('fileDescription') || !body.get('file')) {
      toast.error('Complete all fields.', {
        icon: '⚠️',
        style: {
          background: '#3f7bf2',
          color: '#fff',
        },
      });
    } else {
      const response = await yadbyadMultiPartPost(Routes.submitReport(id), body);

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
          name="filename"
          label="File Name"
          placeholder="File Name"
          required
          helperText="Enter File/Report Name"
          autoComplete="off"
          onChange={(e) => setFilename(e.target.value)}
        />

        <TextField
          type="text"
          name="description"
          label="Description"
          placeholder="Description"
          required
          helperText="Enter File/Report Description"
          autoComplete="off"
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          type="file"
          name="report"
          label="File/Report"
          InputLabelProps={{
            shrink: true,
          }}
          helperText="Maximum file size is 4 MB."
          required
          autoComplete="off"
          onChange={(e) => setReport(e.target.files[0])}
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

SubmitReportForm.propTypes = { handleClose: PropTypes.func, id: PropTypes.func };
