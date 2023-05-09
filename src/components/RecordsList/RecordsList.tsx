import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DataGrid, GridRowParams, GridValueFormatterParams } from '@mui/x-data-grid';
import { Pagination, Box, Backdrop, CircularProgress, Typography, IconButton, Snackbar, Alert, AlertColor, TextField, useTheme, Checkbox, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getRecords, deleteRecord, Record } from '../../api/records';
import { formatDate, formatAmount, formatOperationType } from '../../utils';
import useDebounce from '../../hooks/useDebounce';
import useLoading from '../../hooks/useLoading';
import './RecordsList.css'

const RecordsList: React.FC = () => {
  const { startLoading, stopLoading, isLoading } = useLoading();
  const [records, setRecords] = useState<Record[]>([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success')
  const [removeRecordMessage, setRemoveRecordMessage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [hideDeleted, setHideDeleted] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    totalCount: 0,
  });
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const startLoadingRef = useRef(startLoading);
  const stopLoadingRef = useRef(stopLoading);

  const fetchRecords = useCallback(
    async (page: number, perPage: number, searchTerm: string, sortField: string, sortOrder: string) => {
      startLoadingRef.current();
      try {
        const sort = `${sortField}:${sortOrder}`;
        const data = await getRecords(page, perPage, searchTerm, sort);
        setRecords(data.data);
        setPagination((prevState) => ({
          ...prevState,
          totalCount: data.totalCount,
        }));
      } catch (error) {
        // console.error(error)
      } finally {
        stopLoadingRef.current();
      }
    },
    []
  );

  useEffect(() => {
    // Move to the first page when search term changes
    setPagination((prevState) => ({
      ...prevState,
      page: 1,
    }));
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchRecords(
      pagination.page,
      pagination.perPage,
      debouncedSearchTerm,
      sortField,
      sortOrder
    );
  }, [
    pagination.page,
    pagination.perPage,
    debouncedSearchTerm,
    sortField,
    sortOrder,
    fetchRecords
  ]);

  useEffect(() => {
    startLoadingRef.current = startLoading;
    stopLoadingRef.current = stopLoading;
  }, [startLoading, stopLoading]);

  const getRowClassName = (params: GridRowParams) => {
    if (params.row.deletedAt !== null) {
      return 'deleted-row';
    }
    return '';
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prevState) => ({
      ...prevState,
      page: newPage,
    }));
  };

  const handlePerPageChange = (event: SelectChangeEvent<number>) => {
    setPagination((prevState) => ({
      ...prevState,
      perPage: event.target.value as number,
      page: 1, // Reset to the first page when the number of rows per page changes
    }));
  };

  const handleHideDeletedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHideDeleted(event.target.checked);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = useCallback(async (id: string) => {
    startLoading();
    try {
      const deleted = await deleteRecord(id);
      if (deleted) {
        await fetchRecords(pagination.page, pagination.perPage, searchTerm, sortField, sortOrder);
        handleDeleteWithSuccess();
      }
    } catch (error) {
      handleDeleteError(error as string);
    } finally {
      stopLoading();
    }
  }, [fetchRecords, pagination.page, pagination.perPage, searchTerm, sortField, sortOrder, startLoading, stopLoading]);


  const handleDeleteWithSuccess = () => {
    setAlertSeverity('success')
    setRemoveRecordMessage("Record deleted successfully!")
    setShowSnackbar(true);
  }

  const handleDeleteError = (error: string) => {
    setAlertSeverity('error')
    setRemoveRecordMessage(error)
    setShowSnackbar(true);
  }

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  const columns = useMemo(() => [
    {
      field: 'operationType',
      headerName: 'Operation',
      width: 150,
      editable: false,
      disableColumnMenu: true,
      valueFormatter: (params: GridValueFormatterParams) => formatOperationType(params.value),
      flex: 1,
    },
    {
      field: 'operationResponse',
      headerName: 'Response',
      width: 150,
      editable: false,
      disableColumnMenu: true,
      valueFormatter: (params: GridValueFormatterParams) => formatOperationType(params.value),
      flex: 1
    },
    {
      field: 'amount',
      headerName: 'Cost',
      width: 150,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => formatAmount(params.value),
      flex: 1
    },
    {
      field: 'userBalance',
      headerName: 'Balance (before)',
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      width: 150,
      renderCell: (params: any) => formatAmount(params.value),
      flex: 1
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
      editable: false,
      disableColumnMenu: true,
      flex: 1
    },
    {
      field: 'delete',
      headerName: ' ',
      width: 100,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => (
        params.row.deletedAt === null ? (
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        ) : null
      ),
    },
  ], [handleDelete]);

  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const minHeight = records.length !== 0 ? 120 : 165;
  const rowHeight = 50;
  const dataGridHeight = minHeight + (rowHeight * records.length);
  const filteredRecords = hideDeleted ? records.filter(record => record.deletedAt === null) : records;

  const dataGridContainerStyle: React.CSSProperties = {
    height: dataGridHeight,
    width: '99.8%', // removes horizontal scrollbar
    overflowX: 'hidden'
  };

  return (
    <>
      <Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" data-testid="loading-indicator"/>
      </Backdrop>

      <Box display="flex" justifyContent="center" pt={1} sx={{ color: primaryColor }}>
        <Typography variant="h4" mb={4}>
          RECORDS LIST
        </Typography>
      </Box>

      <Box display="flex" justifyContent="flex-start" mb={2} pr={0.4}>
        <TextField
          id="search-input"
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <Box display="flex" alignItems="center" mb={2} ml={3}>
          <Typography variant="body1" mr={1}>Sort by:</Typography>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="sort-field-label">Field</InputLabel>
            <Select
              labelId="sort-field-label"
              id="sort-field"
              value={sortField}
              onChange={(event: SelectChangeEvent<string>) => setSortField(event.target.value as string)}
              label="Field"
            >
              <MenuItem value="amount">Cost</MenuItem>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="operationType">Operation</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 100, ml: 2 }}>
            <InputLabel id="sort-order-label">Order</InputLabel>
            <Select
              labelId="sort-order-label"
              id="sort-order"
              value={sortOrder}
              onChange={(event: SelectChangeEvent<string>) => setSortOrder(event.target.value as string)}
              label="Order"
            >
              <MenuItem value="asc">Asc</MenuItem>
              <MenuItem value="desc">Desc</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2} ml={5}>
          <Checkbox
            checked={hideDeleted}
            onChange={handleHideDeletedChange}
          />
          <Typography variant="body1">hide deleted rows</Typography>
        </Box>
      </Box>

      <div style={dataGridContainerStyle}>
        <DataGrid
          autoHeight
          autoPageSize
          rows={filteredRecords.map((record) => ({ ...record, date: formatDate(record.date) }))}
          columns={columns}
          rowCount={pagination.totalCount}
          getRowClassName={getRowClassName}
          paginationMode="server"
          getRowId={(row: Record) => row._id}
          hideFooterPagination
          hideFooter
          disableRowSelectionOnClick
          sx={{
            '.MuiDataGrid-columnSeparator': {
              display: 'none',
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: `${primaryColor}`,
              color: "white",
              fontSize: 15
            },
            '& .MuiDataGrid-root': {
              overflowX: 'hidden',
            }
          }}
        />
      </div>
      {
        records.length !== 0 ?
          <Box display="flex" justifyContent="right">
            <Pagination
              count={Math.ceil(pagination.totalCount / pagination.perPage)}
              page={pagination.page}
              onChange={(_, page) => handlePageChange(page)}
              color="primary"
              sx={{ mr: 5 }}
            />
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120, mr: 1 }}>
              <InputLabel id="rows-per-page-label">Rows per page</InputLabel>
              <Select
                labelId="rows-per-page-label"
                id="rows-per-page"
                value={pagination.perPage}
                onChange={handlePerPageChange}
                label="Rows per page"
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Box>

          :
          <></>
      }
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 8 }}
      >
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity} variant="filled">
          {removeRecordMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RecordsList;