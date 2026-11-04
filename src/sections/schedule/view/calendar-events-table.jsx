import { useState } from 'react';
import PropTypes from 'prop-types';
import { format, isValid } from 'date-fns';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'src/components/scrollbar';

const columns = [
  'Date',
  'Start',
  'End',
  'Type',
  'Course title',
  'Course code',
  'Scribe task',
  'Room',
  'Status',
];

function displayDate(value, pattern) {
  const date = new Date(value || '');
  return isValid(date) ? format(date, pattern) : '';
}

export default function CalendarEventsTable({ events }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rows = [...events]
    .sort(
      (a, b) => new Date(a.date) - new Date(b.date) || new Date(a.startTime) - new Date(b.startTime)
    )
    .map((event) => ({
      id: event._id,
      cells: [
        displayDate(event.date, 'dd MMM yyyy'),
        displayDate(event.startTime, 'h:mm a'),
        displayDate(event.endTime, 'h:mm a'),
        event.type,
        event.courseTitle,
        event.fCourse,
        event.scribeTask,
        event.bookedRoom,
        event.slotRequestId?.status || event.status,
      ],
    }))
    .filter(({ cells }) => cells.join(' ').toLowerCase().includes(search.trim().toLowerCase()));
  const currentPage = Math.min(page, Math.max(0, Math.ceil(rows.length / rowsPerPage) - 1));

  return (
    <Card>
      <Typography component="h2" variant="h6" sx={{ px: 3, pt: 2.5 }}>
        Schedule details
      </Typography>
      <TextField
        size="small"
        label="Filter schedule details"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(0);
        }}
        sx={{ m: 2.5, mt: 2, width: { xs: 'calc(100% - 40px)', sm: 300 } }}
      />
      <Scrollbar>
        <Table aria-label="Schedule details" sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
              .map(({ id, cells }) => (
                <TableRow hover key={id}>
                  {columns.map((column, index) => (
                    <TableCell key={column}>{cells[index] || '—'}</TableCell>
                  ))}
                </TableRow>
              ))}
            {!rows.length && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No matching events.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={rows.length}
        page={currentPage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={(_, nextPage) => setPage(nextPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(Number(event.target.value));
          setPage(0);
        }}
      />
    </Card>
  );
}

CalendarEventsTable.propTypes = { events: PropTypes.array.isRequired };
