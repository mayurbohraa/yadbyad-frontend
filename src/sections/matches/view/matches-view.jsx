import { useState,useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Routes from 'src/api/apiRoutes';
import { yadbyadGet } from 'src/api/api.service';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../matches-table-row';
import TableEmptyRows from '../table-empty-rows';
import UserTableHead from '../matches-table-head';
import UserTableToolbar from '../matches-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function MatchesView() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('status');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [matches, setMatches] = useState([]);

  const [dataFiltered, setDataFiltered] = useState([]);

  const [notFound,setNotFound] = useState(true);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = matches.map((n) => n.status);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, status) => {
    const selectedIndex = selected.indexOf(status);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, status);
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
    if(!matches.length){
      fetchMatches();
    }
    
    const dataFilteredValue = applyFilter({
      inputData: matches,
      comparator: getComparator(order, orderBy),
      filterName,
    });
  
  setDataFiltered(dataFilteredValue);
  setNotFound(!dataFilteredValue.length && !!filterName);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order,orderBy,filterName]);

  const fetchMatches = async (e) => {
    const response = await yadbyadGet(Routes.fetchmatches);   
    setMatches(response??[]);   
    const dataFilteredValue = applyFilter({
      inputData: response??[],
      comparator: getComparator(order, orderBy),
      filterName,
    });
    setDataFiltered(dataFilteredValue); 
  };

  const user_details = JSON.parse(localStorage.getItem('login_status'));

  return (
    <Container>
      <Stack mb={5}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h4">Matches</Typography>
      </Stack>
      <Typography variant='subtitle1'>Students Match Details</Typography>
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
              
              
        {user_details.role === 'special need student' && (
          <UserTableHead
          order={order}
          orderBy={orderBy}
          rowCount={matches.length}
          numSelected={selected.length}
          onRequestSort={handleSort}
          onSelectAllClick={handleSelectAllClick}
          headLabel={[
            { id: 'fullName', label:'Part Time Student Name'},
            { id: 'studentID', label:'Student ID'},
            { id: 'mobile No.', label: 'Mobile No.' },
            { id: 'type', label:'Type'},
            { id: 'room', label: 'Booked Room' },
            { id: 'date', label: 'Date' },
            { id: 'startTime', label: 'Start Time' },
            { id: 'endTime', label: 'End Time' },
            { id: 'status', label: 'Status' },
          ]}
        />
        )}
        
        {user_details.role === 'part time student' && (
          <UserTableHead
          order={order}
          orderBy={orderBy}
          rowCount={matches.length}
          numSelected={selected.length}
          onRequestSort={handleSort}
          onSelectAllClick={handleSelectAllClick}
          headLabel={[
            { id: 'fullName', label: 'Special Need Student Name' },
            { id: 'studentID', label: 'Student ID' },
            { id: 'mobile No.', label: 'Mobile No.' },
            { id: 'type', label:'Type'},
            { id: 'room', label: 'Booked Room' },
            { id: 'date', label: 'Date' },
            { id: 'startTime', label: 'Start Time' },
            { id: 'endTime', label: 'End Time' },
            { id: 'status', label: 'Status' },
          ]}
        />
        )}

              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row._id}
                      row={row}
                      selected={selected.indexOf(row.status) !== -1}
                      handleClick={(event) => handleClick(event, row.status)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, matches.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={matches.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
