import * as React from 'react';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Routes from 'src/api/apiRoutes';
import { yadbyadGet } from 'src/api/api.service';
import { AddExamForm } from 'src/forms/add_exam';
import { AddLectureForm } from 'src/forms/add_lecture';
import { CasualSessionForm } from 'src/forms/casual_session';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import Calendar from './Calendar';
import TableNoData from './table-no-data';
import TableEmptyRows from './table-empty-rows';
import UserTableRow from './schedule-table-row';
import UserTableHead from './schedule-table-head';
import UserTableToolbar from './schedule-table-toolbar';
import { emptyRows, applyFilter, getComparator } from './utils';
// ----------------------------------------------------------------------

export default function ScheduleView() {
  const [lectureForm, setLectureForm] = React.useState(false);
  const handleLecture = () => setLectureForm(!lectureForm);

  const [casualForm, setCasualForm] = React.useState(false);
  const handleCasual = () => setCasualForm(!casualForm);

  const [examForm, setExamForm] = React.useState(false);
  const handleExam = () => setExamForm(!examForm);

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

  // ------------------Code fix starts
  // ** Demo Events **
  const [events, setEvents] = React.useState([]);
  const [filterType, setFilterType] = React.useState('All');
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [role, setRole] = React.useState('');
  const [filteredEvents, setFilteredEvents] = React.useState([]);

  const fetchEvents = async () => {
    const response = await yadbyadGet(Routes.fetchExams);
    return response ?? [];
  };

  const handleTabChange = (e, newValue) => {
    setFilterType(newValue);
  };

  React.useEffect(() => {
    if (filterType === 'All') {
      setFilteredEvents([...events]); // If filter type is All, set filtered events to all events
    } else {
      const filtered = events.filter((event) => event.type === filterType);
      setFilteredEvents(filtered);
    }
  }, [filterType, events]);

  React.useEffect(() => {
    const fetchData = async () => {
      const eventsData = await fetchEvents();
      const Today = new Date();
      const futureEventsData = eventsData.filter((event) => {
        // Parse event date and time
        const eventDate = new Date(event.date);

        // Compare event date with current date
        return eventDate > Today;
      });
      setEvents(futureEventsData);
      setFilteredEvents(futureEventsData); // Initially set filteredEvents to all events
    };

    fetchData();
  }, []);


  React.useEffect(() => {
    const user_details = JSON.parse(localStorage.getItem('login_status'));
    setRole(user_details.role);
  }, []);
  // -------------------Code fix ends

  const [exams, setExams] = useState([]);

  const [dataFiltered, setDataFiltered] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('date');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [notFound, setNotFound] = useState(true);

  const handleSort = (event, _id) => {
    const isAsc = orderBy === _id && order === 'asc';
    if (_id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(_id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = exams.map((n) => n.courseTitle);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, courseTitle) => {
    const selectedIndex = selected.indexOf(courseTitle);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, courseTitle);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  useEffect(() => {
    if (!exams.length) {
      fetchExams();
    }

    const dataFilteredValue = applyFilter({
      inputData: exams,
      comparator: getComparator(order, orderBy),
      filterName,
    });

    setDataFiltered(dataFilteredValue);
    setNotFound(!dataFilteredValue.length && !!filterName);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy, filterName]);

  const fetchExams = async (e) => {
    const response = await yadbyadGet(Routes.AdminFetchExams);
    setExams(response ?? []);
    const dataFilteredValue = applyFilter({
      inputData: response ?? [],
      comparator: getComparator(order, orderBy),
      filterName,
    });
    setDataFiltered(dataFilteredValue);
  };

  return (
    <Container>
      <Stack mb={5}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4">Schedules</Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
            spacing={2}
          >
            <Stack direction="row" spacing={2}>
              {role === 'special need student' && (
                <Button
                  variant="contained"
                  color="inherit"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={handleLecture}
                >
                  Add Lecture
                </Button>
              )}
              {role === 'special need student' && (
                <Button
                  variant="contained"
                  color="inherit"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={handleCasual}
                >
                  Ask Casual
                </Button>
              )}
            </Stack>

            <Stack direction="row">
              {role !== 'admin' && (
                <ToggleButtonGroup
                  color="primary"
                  exclusive
                  onChange={handleTabChange}
                  aria-label="Platform"
                  value={filterType}
                >
                  <ToggleButton value="All">All</ToggleButton>
                  <ToggleButton value="lecture">Lecture</ToggleButton>
                  <ToggleButton value="exam">Exam</ToggleButton>
                  <ToggleButton value="casual">Casual</ToggleButton>
                </ToggleButtonGroup>
              )}
            </Stack>

            <Stack direction="row">
              {role === 'admin' && (
                <Button
                  variant="contained"
                  color="inherit"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={handleExam}
                >
                  Add Exam
                </Button>
              )}
            </Stack>

            <Modal
              open={lectureForm}
              onClose={handleLecture}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Scrollbar>
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Lecture
                  </Typography>
                  <hr />
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <AddLectureForm handleClose={handleLecture} setEvents={setEvents} />
                  </Typography>
                </Box>
              </Scrollbar>
            </Modal>
            <Modal
              open={examForm}
              onClose={handleExam}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Scrollbar>
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Exam
                  </Typography>
                  <hr />
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <AddExamForm handleClose={handleExam} />
                  </Typography>
                </Box>
              </Scrollbar>
            </Modal>
            <Modal
              open={casualForm}
              onClose={handleCasual}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Scrollbar>
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Request Casual Session
                  </Typography>
                  <hr />
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <CasualSessionForm handleClose={handleCasual} />
                  </Typography>
                </Box>
              </Scrollbar>
            </Modal>
          </Stack>
        </Stack>
        {role !== 'admin' && (
          <Scrollbar>
            <Calendar value={currentDate} onChange={setCurrentDate} events={filteredEvents} />
          </Scrollbar>
        )}

        {role === 'admin' && (
          <Typography variant="subtitle1">Special Need Students Exams Schedule Details</Typography>
        )}
      </Stack>

      {role === 'admin' && (
        <Card>
          <UserTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={exams.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'fullName', label: 'Name' },
                    { id: 'studentID', label: 'Student ID' },
                    { id: 'type', label: 'Type' },
                    { id: 'courseTitle', label: 'Course Title' },
                    { id: 'fcourse', label: 'F_Course' },
                    { id: 'scribeTask', label: 'Scribe Task' },
                    { id: 'bookedRoom', label: 'Booked Room' },
                    { id: 'date', label: 'Date' },
                    { id: 'startTime', label: 'Start Time' },
                    { id: 'endTime', label: 'End Time' },
                    { id: 'createdAt', label: 'Created At' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <UserTableRow
                        key={row._id}
                        id={row._id}
                        fullName={row.userId?.fullName}
                        studentID={row.userId?.studentID}
                        type={row.type}
                        courseTitle={row.courseTitle}
                        fcourse={row.fCourse}
                        scribeTask={row.scribeTask}
                        bookedRoom={row.bookedRoom}
                        date={row.date}
                        startTime={row.startTime}
                        endTime={row.endTime}
                        createdAt={row.createdAt}
                        selected={selected.indexOf(row.courseTitle) !== -1}
                        handleClick={(event) => handleClick(event, row.courseTitle)}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, exams.length)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={exams.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      )}
    </Container>
  );
}
