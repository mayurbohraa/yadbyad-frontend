import { useState, useEffect} from 'react';

import Box from '@mui/material/Box';
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
import { ComplainForm } from 'src/forms/complain';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import UserTableRow from '../student-complains-table-row';
import UserTableHead from '../student-complains-table-head';
import { emptyRows, applyFilter, getComparator } from '../utils';
import UserTableToolbar from '../student-complains-table-toolbar';

// ----------------------------------------------------------------------

export default function StudentComplainsView() {

  const [complains, setComplains] = useState([]);

  const [dataFiltered, setDataFiltered] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('status');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

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
      const newSelecteds = complains.map((n) => n.status);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, FullName) => {
    const selectedIndex = selected.indexOf(FullName);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, FullName);
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
    const response = await yadbyadGet(Routes.fetchComplain);   
    setComplains(response??[]);   
    const dataFilteredValue = applyFilter({
      inputData: response??[],
      comparator: getComparator(order, orderBy),
      filterName,
    });
    setDataFiltered(dataFilteredValue); 
  };


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    marginTop: '2%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 500,
    // maxHeight: 640,
    marginBottom:'2%',
    bgcolor: 'background.paper',
    borderRadius:0.5,
    boxShadow: 24,
    p: 4,
  };


  return (
    <Container>
      <Stack mb={5}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h4">Complains (Student)</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}> 
          Complain 
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
            Complain Form (Student)
          </Typography>
          <hr/>
          <Typography id="modal-modal-description" sx={{ mt: 2}}>
            <ComplainForm handleClose={handleClose}/>
          </Typography>
        </Box>
        </Scrollbar>
      </Modal>
       </Stack>
       <Typography variant='subtitle1'>Your Complain Details</Typography>
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
                  { id: 'subject', label:'Subject'},
                  { id: 'message', label:'Message'},
                  { id: 'createdAt', label: 'Created At' },
                  { id: 'status', label: 'Status' },
                  { id: 'reply', label: 'Reply' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      id={row._id}
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
