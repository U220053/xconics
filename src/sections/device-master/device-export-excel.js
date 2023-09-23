import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';
import Iconify from 'src/components/iconify';
import Button from '@mui/material/Button';

const ExportToExcelDevice = ({ data, filename }) => {
  const handleExportToExcel = () => {
    const excludedColumns = ['del_flag', '__v','_id'];
    // Add the keys of the columns to be excluded

    // Filter the data array to include only the columns you want to export
    const filteredData = data.map((item) => {
      const filteredItem = { ...item };
      excludedColumns.forEach((columnKey) => {
        delete filteredItem[columnKey];
      });
      return filteredItem;
    });

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };
  const [hovered, setHovered] = useState(false);

  const divStyle = {
    backgroundColor: hovered ? '#2980b9' : '#3498db',
    color: '#fff',
    padding: '10px 30px',
    cursor: 'pointer',
    fontSize : '15px',
    margin : '10px',
  };
  return (
    <Button
      onClick={handleExportToExcel}
      style={divStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      variant="contained"
      startIcon={<Iconify icon="mdi:microsoft-excel" />}
    >
     Export to Excel
    </Button>
  );
};

ExportToExcelDevice.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filename: PropTypes.string.isRequired,
};

export default ExportToExcelDevice;
