import { useState, useEffect} from 'react';

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
import TableEmptyRows from '../table-empty-rows';
import UserTableRow from '../manage-complains-table-row';
import UserTableHead from '../manage-complains-table-head';
import UserTableToolbar from '../manage-complains-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function ManageComplainsView() {

  
  const [complains, setComplains] = useState([]);

  const [dataFiltered, setDataFiltered] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('status');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [notFound,setNotFound] = useState(true);

  const handleSort = (event, _id) => {
    const isAsc = orderBy === _id && order === 'asc';
    if (_id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(_id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = complains.map((n) => n.status);
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
    if(!complains.length){
      fetchComplains();
    }
    
    const dataFilteredValue = applyFilter({
      inputData: complains,
      comparator: getComparator(order, orderBy),
      filterName,
    });
  
  setDataFiltered(dataFilteredValue);
  setNotFound(!dataFilteredValue.length && !!filterName);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order,orderBy,filterName]);


  const fetchComplains = async (e) => {
    const response = await yadbyadGet(Routes.fetchAllComplain);   
    setComplains(response??[]);   
    const dataFilteredValue = applyFilter({
      inputData: response??[],
      comparator: getComparator(order, orderBy),
      filterName,
    });
    setDataFiltered(dataFilteredValue); 
  };


  return (
    <Container>
      <Stack mb={5}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h4">Manage Complains</Typography>
       </Stack>
       <Typography variant='subtitle1'>All Students Complain Details</Typography>
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
                rowCount={complains.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'fullName', label: 'Name' },
                  { id: 'studentID', label:'Student ID'},
                  { id: 'role', label:'Role'},
                  { id: 'subject', label:'Subject'},
                  { id: 'message', label:'Message'},
                  { id: 'createdAt', label: 'Created At' },
                  { id: 'status', label: 'Status' },
                  { id: 'reply', label: 'Reply' },
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
                      role={row.userId?.role}
                      subject={row.subject}
                      message={row.message}
                      reply={row.replyMessage}
                      createdAt={row.createdAt}
                      status={row.status}
                      selected={selected.indexOf(row.status) !== -1}
                      handleClick={(event) => handleClick(event, row.status)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, complains.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={complains.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
