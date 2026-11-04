import { useState, useEffect } from 'react';

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

import useApiRefresh from 'src/hooks/use-api-refresh';

import Routes from 'src/api/apiRoutes';
import { yadbyadGet } from 'src/api/api.service';
import { AddResourcesForm } from 'src/forms/add_resources';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import UserTableRow from '../manage-library-table-row';
import UserTableHead from '../manage-library-table-head';
import UserTableToolbar from '../manage-library-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function ManageLibraryView() {
  const [resource, setResource] = useState([]);

  const [dataFiltered, setDataFiltered] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('title');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [notFound, setNotFound] = useState(true);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = resource.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, title) => {
    const selectedIndex = selected.indexOf(title);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, title);
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
    if (!resource.length) {
      fetchResources();
    }

    const dataFilteredValue = applyFilter({
      inputData: resource,
      comparator: getComparator(order, orderBy),
      filterName,
    });

    setDataFiltered(dataFilteredValue);
    setNotFound(!dataFilteredValue.length && !!filterName);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy, filterName]);

  const fetchResources = async (e) => {
    const response = await yadbyadGet(Routes.fetchResources);
    setResource(response ?? []);
    const dataFilteredValue = applyFilter({
      inputData: response ?? [],
      comparator: getComparator(order, orderBy),
      filterName,
    });
    setDataFiltered(dataFilteredValue);
    setNotFound(!dataFilteredValue.length && !!filterName);
    setPage((current) =>
      Math.min(current, Math.max(0, Math.ceil(dataFilteredValue.length / rowsPerPage) - 1))
    );
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
    marginBottom: '2%',
    bgcolor: 'background.paper',
    borderRadius: 0.5,
    boxShadow: 24,
    p: 4,
  };

  useApiRefresh(fetchResources, ['/library']);

  return (
    <Container>
      <Stack mb={5}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4">Manage Library</Typography>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpen}
          >
            Add Resource
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
                  Add Resource
                </Typography>
                <hr />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <AddResourcesForm handleClose={handleClose} />
                </Typography>
              </Box>
            </Scrollbar>
          </Modal>
        </Stack>
        <Typography variant="subtitle1">Resources Details</Typography>
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
                rowCount={resource.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'title', label: 'Title' },
                  { id: 'description', label: 'Description' },
                  { id: 'url', label: 'Resource' },
                  { id: '' },
                  // { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      id={row._id}
                      title={row.title}
                      description={row.description}
                      url={row.url}
                      selected={selected.indexOf(row.title) !== -1}
                      handleClick={(event) => handleClick(event, row.title)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
