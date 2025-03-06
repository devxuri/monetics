import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Select, Button, Stack } from '@mui/material';


function generateColumnsAndRows(uploadedStatements) {
  if (!uploadedStatements || uploadedStatements.length === 0) {
    return { columns: [], rows: [] };
  }

  const columns = Object.keys(uploadedStatements[0]).map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    flex: 1,
    minWidth: 100,
    editable: key === 'spendingCategory',
    ...(key === 'spendingCategory' && {
      type: 'singleSelect',
      valueOptions: spendingCategories,
      renderEditCell: (params) => (
        <Select
          value={params.value}
          onChange={(event) => {
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: event.target.value,
            });
          }}
          fullWidth
          native
        >
          {spendingCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      ),
    }),
  }));

  const rows = uploadedStatements.map((statement, index) => ({
    id: index + 1,
    ...statement,
  }));

  return { columns, rows };
}

const spendingCategories = [
  'Groceries',
  'Payments',
  'Restaurants',
  'Subscription',
  'Entertainment',
  'Housing & Utilities',
  'Transportation',
  'Miscellaneous',
];

export default function TransactionsDataGrid() {

  const uploadedStatements = JSON.parse(sessionStorage.getItem('uploadedStatements')) || [];
  const { columns, rows } = generateColumnsAndRows(uploadedStatements);

  const [localRows, setLocalRows] = React.useState(rows);

  const handleProcessRowUpdate = (newRow) => {
    const updatedRows = localRows.map((row) =>
      row.id === newRow.id ? newRow : row
    );
    setLocalRows(updatedRows);

    const updatedStatements = updatedRows.map((row) => {
      const { id, ...rest } = row;
      return rest;
    });
    sessionStorage.setItem('uploadedStatements', JSON.stringify(updatedStatements));

    return newRow;
  };

  return (
    <Box>
      <DataGrid
        rows={localRows}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        processRowUpdate={handleProcessRowUpdate}
        onProcessRowUpdateError={(error) => console.error(error)}
        editMode="row"
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: 'outlined',
                size: 'small',
              },
              columnInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              operatorInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: 'outlined',
                  size: 'small',
                },
              },
            },
          },
        }}
      />
    </Box>
  );
}