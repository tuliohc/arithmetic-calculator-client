import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getRecords } from '../../api/records';
import './RecordsList.css';

const RecordsList: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const data = await getRecords();
      setRecords(data);
    };

    fetchRecords();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    // Add more columns as needed
  ];

  return (
    <div className="records-list">
      <h1>Records List</h1>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={records} columns={columns} />
      </div>
    </div>
  );
};

export default RecordsList;