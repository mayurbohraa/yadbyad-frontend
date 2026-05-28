import { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Routes from 'src/api/apiRoutes';
import { yadbyadGet } from 'src/api/api.service';
import { AddUserForm } from 'src/forms/add_user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// --------------------------------------------------------------------

export default function UserPage() {
  const [students, setStudents] = useState([]);

  const [dataFiltered, setDataFiltered] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('role');

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
      const newSelecteds = students.map((n) => n.role);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, role) => {
    const selectedIndex = selected.indexOf(role);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, role);
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
    if (!students.length) {
      fetchStudents();
    }

    const dataFilteredValue = applyFilter({
      inputData: students,
      comparator: getComparator(order, orderBy),
      filterName,
    });

    setDataFiltered(dataFilteredValue);
    setNotFound(!dataFilteredValue.length && !!filterName);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy, filterName]);

  const fetchStudents = async (e) => {
    const response = await yadbyadGet(Routes.users);
    setStudents(response ?? []);
    const dataFilteredValue = applyFilter({
      inputData: response ?? [],
      comparator: getComparator(order, orderBy),
      filterName,
    });
    setDataFiltered(dataFilteredValue);
  };

  // Model code

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <Container>
      <Stack mb={5}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4">Users</Typography>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpen}
          >
            New User
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Scrollbar>
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add New User (Student)
                </Typography>
                <hr />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <AddUserForm handleClose={handleClose} />
                </Typography>
              </Box>
            </Scrollbar>
          </Modal>
        </Stack>
        <Typography variant="subtitle1"> All User Details</Typography>
      </Stack>

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
                rowCount={students.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'fullName', label: 'Name' },
                  { id: 'username', label: 'Username' },
                  { id: 'studentID', label: 'Student ID' },
                  { id: 'email', label: 'Email' },
                  { id: 'mobileNumber', label: 'Mobile No.' },
                  { id: 'role', label: 'Role' },
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
                      fullName={row.fullName}
                      username={row.username}
                      studentID={row.studentID}
                      email={row.email}
                      mobileNumber={row.mobileNumber}
                      role={row.role}
                      avatarUrl={row.avatarUrl}
                      selected={selected.indexOf(row.role) !== -1}
                      handleClick={(event) => handleClick(event, row.role)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, students.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
