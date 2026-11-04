import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import useApiRefresh from 'src/hooks/use-api-refresh';

import Routes from 'src/api/apiRoutes';
import { yadbyadGet } from 'src/api/api.service';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import UserTableRow from '../student-reports-table-row';
import UserTableHead from '../student-reports-table-head';
import UserTableToolbar from '../student-reports-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function StudentReportsView() {
  const [reports, setReports] = useState([]);

  const [dataFiltered, setDataFiltered] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('status');

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
      const newSelecteds = reports.map((n) => n.status);
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
    if (!reports.length) {
      fetchReports();
    }

    const dataFilteredValue = applyFilter({
      inputData: reports,
      comparator: getComparator(order, orderBy),
      filterName,
    });

    setDataFiltered(dataFilteredValue);
    setNotFound(!dataFilteredValue.length && !!filterName);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy, filterName]);

  const fetchReports = async (e) => {
    const response = await yadbyadGet(Routes.fetchReport);
    setReports(response ?? []);
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

  useApiRefresh(fetchReports, ['/reports']);

  return (
    <Container>
      <Stack mb={5}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4">Submitted Reports</Typography>
        </Stack>
        <Typography variant="subtitle1">Part Time Students Reports Details</Typography>
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
                rowCount={reports.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'filename', label: 'File Name' },
                  { id: 'description', label: 'Description' },
                  { id: 'slot', label: 'Slot' },
                  { id: 'viewfile', label: 'File' },
                  { id: 'createdAt', label: 'Submitted At' },
                  { id: 'status', label: 'Status' },
                  { id: 'remarks', label: 'Remark' },
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
                      filename={row.filename}
                      description={row.fileDescription}
                      remarks={row.remarks}
                      createdAt={row.createdAt}
                      status={row.status}
                      slot={row.slotId?.title}
                      selected={selected.indexOf(row.status) !== -1}
                      handleClick={(event) => handleClick(event, row.status)}
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
