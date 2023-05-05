import React, { useState, useEffect } from 'react';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { Pagination, Box, Typography, IconButton, Snackbar, Alert, AlertColor, TextField, useTheme, Checkbox, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getRecords, deleteRecord, Record } from '../../api/records';
import { formatDate, formatAmount, formatOperationType } from '../../utils';
import './RecordsList.css'
import useDebounce from '../../hooks/useDebounce';

const RecordsList: React.FC = () => {
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

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    // Move to the first page when search term changes
    setPagination((prevState) => ({
      ...prevState,
      page: 1,
    }));
  }, [debouncedSearchTerm]);

  
  useEffect(() => {
    fetchRecords(pagination.page, pagination.perPage, debouncedSearchTerm);
  }, [pagination.page, pagination.perPage, debouncedSearchTerm]);

  const fetchRecords = async (page: number, perPage: number, searchTerm: string) => {
    try {
      const data = await getRecords(page, perPage, searchTerm);
      setRecords(data.data);
      setPagination((prevState) => ({
        ...prevState,
        totalCount: data.totalCount,
      }));
    } catch (error) {
      // to do
    }
  };

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

  const handleDelete = async (id: string) => {
    try {
      const deleted = await deleteRecord(id);
      if (deleted) {
        await fetchRecords(pagination.page, pagination.perPage, searchTerm);
        handleDeleteWithSuccess()
      }
    } catch (error) {
      handleDeleteError(error as string)
    }
  };

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
  
  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const columns = [
    { 
      field: 'operationType', 
      headerName: 'Operation Type', 
      width: 150,
      editable: false,
      disableColumnMenu: true,
      valueFormatter: (params: any) => formatOperationType(params.value),
      flex: 1,
    },
    { 
      field: 'operationResponse', 
      headerName: 'Operation Response', 
      width: 150,
      editable: false,
      disableColumnMenu: true,
      valueFormatter: (params: any) => formatOperationType(params.value),
      flex: 1
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 150,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => formatAmount(params.value),
      flex: 1
    },
    { field: 'userBalance', 
      headerName: 'User Balance', 
      editable: false,
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
  ];
  
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const minHeight = 150; 
  const rowHeight = 50; 
  const dataGridHeight = minHeight + (rowHeight * records.length);
  const filteredRecords = hideDeleted ? records.filter(record => record.deletedAt === null) : records;

  return (
    <>
      <Box display="flex" justifyContent="center" pt={1} sx={{ color: primaryColor }}>
        <Typography variant="h4" mb={4}>
          RECORDS LIST
        </Typography>
      </Box>
      
      <Box display="flex" justifyContent="flex-end" mb={2} pr={0.4}>
        <Box display="flex" justifyContent="flex-start" alignItems="center" mb={2} mr={5}>
          <Checkbox
            checked={hideDeleted}
            onChange={handleHideDeletedChange}
          />
          <Typography variant="body1">hide deleted rows</Typography>
        </Box>

        <TextField
          id="search-input"
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
        />

      </Box>
      
      <div style={{ height: dataGridHeight, width: '99.7%' }}>
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
            }
          }}
        />
      </div>

      <Box display="flex" justifyContent="right" mt={0}>
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

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity} variant="filled">
          { removeRecordMessage }
        </Alert>
      </Snackbar>
    </>
  );
};

export default RecordsList;