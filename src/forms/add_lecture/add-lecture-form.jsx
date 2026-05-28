import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Checkbox, FormControl, FormControlLabel } from '@mui/material';

import Routes from 'src/api/apiRoutes';
import { yadbyadPost } from 'src/api/api.service';

export default function AddLectureForm({ handleClose, setEvents }) {
  const history = useNavigate();

  const [month, setMonth] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startTime, setStartTime] = useState('');
  const [bookedRoom, setBookedRoom] = useState('');
  const [fCourse, setFCourse] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [scribeTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const getuser = localStorage.getItem('login_status');
    const body = {
      month: month.trim(),
      selectedDays,
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      type: 'lecture',
      bookedRoom: bookedRoom.trim(),
      fCourse: fCourse.trim(),
      courseTitle: courseTitle.trim(),
      scribeTask: scribeTask.trim(),
      specialNeedsStudentName: getuser.fullName,
      specialNeedsStudentID: getuser.studentID,
      specialNeedsStudentPhoneNumber: getuser.mobileNumber,
    };

    if (
      body.month === '' ||
      body.selectedDays === '' ||
      body.startTime === '' ||
      body.endTime === '' ||
      body.type === '' ||
      body.bookedRoom === '' ||
      body.courseTitle === '' ||
      body.specialNeedsStudentID === '' ||
      body.specialNeedsStudentName === '' ||
      body.specialNeedsStudentPhoneNumber === ''
    ) {
      toast.error('Complete all fields.', {
        icon: '⚠️',
        style: {
          background: '#3f7bf2',
          color: '#fff',
        },
      });
    } else {
      const response = await yadbyadPost(Routes.createLecture, body);

      if (response) {
        handleClose();
        setTimeout(() => {
          history(0);
        }, '500');

        // method 1
        // const newEvents = [...events,response.data];
        // setEvents(newEvents);

        // method 2
        // setEvents((prev) => [...prev,response.flat()])
      }
    }
  };

  const [selectedDays, setSelectedDays] = useState([]);

  const handleChange = (event) => {
    const { target } = event;
    const { value } = target;
    const isChecked = target.checked;

    if (isChecked) {
      // Add value to selectedDays array if it's not already included
      if (!selectedDays.includes(value)) {
        setSelectedDays([...selectedDays, value]);
      }
    } else {
      // Remove value from selectedDays array
      setSelectedDays(selectedDays.filter((item) => item !== value));
    }
  };

  return (
    <Box>
      <Stack spacing={3}>
        {/* Month */}
        <Stack>
          <TextField
            type="month"
            id="month"
            name="month"
            label="Month"
            placeholder="Month"
            autoComplete="off"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setMonth(e.target.value)}
          />
        </Stack>

        <Stack>
          <b>Days of the Week :</b>
          <FormControl>
            <Stack direction="row" gap={5} my={2}>
              <Stack>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedDays.monday}
                      onChange={handleChange}
                      name="monday"
                      value="Monday"
                    />
                  }
                  label="Monday"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedDays.thursday}
                      onChange={handleChange}
                      name="thursday"
                      value="Thursday"
                    />
                  }
                  label="Thursday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedDays.sunday}
                      onChange={handleChange}
                      name="sunday"
                      value="Sunday"
                    />
                  }
                  label="Sunday"
                />
              </Stack>
              <Stack>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedDays.tuesday}
                      onChange={handleChange}
                      name="tuesday"
                      value="Tuesday"
                    />
                  }
                  label="Tuesday"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedDays.friday}
                      onChange={handleChange}
                      name="friday"
                      value="Friday"
                    />
                  }
                  label="Friday"
                />
              </Stack>
              <Stack>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedDays.wednesday}
                      onChange={handleChange}
                      name="wednesday"
                      value="Wednesday"
                    />
                  }
                  label="Wednesday"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedDays.saturday}
                      onChange={handleChange}
                      name="saturday"
                      value="Saturday"
                    />
                  }
                  label="Saturday"
                />
              </Stack>
            </Stack>
          </FormControl>
        </Stack>

        {/* Start Time */}
        <Stack>
          <TextField
            type="time"
            id="StartTime"
            name="StartTime"
            label="StartTime"
            placeholder="StartTime"
            autoComplete="off"
            required
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Stack>
        {/* End Time */}
        <Stack>
          <TextField
            type="time"
            id="EndTime"
            name="EndTime"
            label="EndTime"
            placeholder="EndTime"
            autoComplete="off"
            required
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Stack>

        {/* Booked Room */}
        <Stack>
          <TextField
            type="text"
            id="booked_room"
            name="booked_room"
            label="Booked Room"
            placeholder="Booked Room"
            autoComplete="off"
            required
            onChange={(e) => setBookedRoom(e.target.value)}
          />
        </Stack>

        {/* F_Course */}
        <Stack>
          <TextField
            type="text"
            id="f_course"
            name="f_course"
            label="F_Course (optional)"
            placeholder="F_Course (optional)"
            autoComplete="off"
            onChange={(e) => setFCourse(e.target.value)}
          />
        </Stack>

        {/* Course Title */}
        <Stack>
          <TextField
            type="text"
            id="course_title"
            name="course_title"
            label="Course Title"
            placeholder="Course Title"
            autoComplete="off"
            required
            onChange={(e) => setCourseTitle(e.target.value)}
          />
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

AddLectureForm.propTypes = { handleClose: PropTypes.func, setEvents: PropTypes.func };
