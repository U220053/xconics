/* eslint-disable react-hooks/exhaustive-deps */
import isEqual from 'lodash/isEqual';
import { useState, useCallback, useEffect } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
// _mock
import { _userList, _roles, USER_STATUS_OPTIONS } from 'src/_mock';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'src/utils/axios';
import PermissionTableRow from '../permission-table-row';
// import PermissionTableToolbar from '../permission-table-toolbar';
import PermissionTableFiltersResult from '../permission-table-filters-result';
import ExportToExcelButton from '../permission-export';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'InActive' },
];

const TABLE_HEAD = [
  { id: 'user_group_ref', label: 'Group Name' },
  { id: 'screen_name', label: 'Screen Name', width: 180 },
  { id: 'add', label: 'Add', width: 220 },
  { id: 'edit', label: 'Edit', width: 180 },
  { id: 'delete', label: 'Delete', width: 180 },
  { id: 'export', label: 'Export', width: 180 },
  { id: 'print', label: 'Print', width: 180 },
  { id: 'enable', label: 'Enable', width: 180 },
  { id: 'status', label: 'Status', width: 100 },
  { id: '', width: 88 },
];
const defaultFilters = {
  name: '',
  // role: [],
  status: 'all',
};
// ----------------------------------------------------------------------

export default function PermissionListView() {
  const table = useTable();

  const settings = useSettingsContext();
  // const [updateTrigger, setUpdateTrigger] = useState(false);
  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState([]);
  const [isSuccess, setisSuccess] = useState();
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('api/user/permission');
        // const data = await response.json();

        setisSuccess(response.data.success);
        setTableData(response.data.data);
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    }

    fetchData();
  }, []);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });
  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );
  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );
  async function deletegroup(id) {
    await axios.post(`api/user/permission/delete/${id}`);
  }
  /// have to call API
  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row._id !== id);
      try {
        deletegroup(id);
      } catch (err) {
        console.error('Error fetching API data:', err);
      }
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const deleteSelectedGroups = async (selectedIds) => {
    const deletePromises = selectedIds.map((id) => deletegroup(id));

    try {
      await Promise.all(deletePromises);
      // Optionally, you can perform additional actions after deleting all groups
      console.log('Selected groups deleted successfully');
    } catch (error) {
      console.error('Error deleting selected groups:', error);
    }
  };
  const handleDeleteRows = useCallback(() => {
    const selectedIds = table.selected;
    const deleteRows = tableData.filter((row) => !table.selected.includes(row._id));
    try {
      deleteSelectedGroups(selectedIds);

      console.log('Selected groups deleted successfully');
    } catch (error) {
      console.error('Error deleting selected groups:', error);
    }
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);
  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.user.permissionedit(id));
    },
    [router]
  );
  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );
  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // starting of export to pdf
  const [hovered, setHovered] = useState(false);

  const divStyle = {
    backgroundColor: hovered ? '#2980b9' : '#3498db',
    color: '#fff',
    padding: '10px 30px',
    cursor: 'pointer',
    fontSize: '15px',
    margin: '10px',
  };
  const allRowsData = dataFiltered
    .slice(table.page * table.rowsPerPage, table.page * table.rowsPerPage + table.rowsPerPage)
    .map((row) => {
      return {
        user_group_ref: row.user_group_ref.user_group_name,
        screen_name: row.screen_name,
        add: row.add_permission,
        edit: row.edit_permission,
        delete: row.delete_permission,
        export: row.export_permission,
        print: row.print_permission,
        enable: row.enable_permission,
        status: row.status,
      };
    });
  
  const labels = TABLE_HEAD.map((item) => item.label);
  const exportToPDF = () => {
    const doc = new jsPDF();

    const tableData = allRowsData.map((rowData) => {
      return Object.values(rowData);
    });
    console.log(tableData);
    doc.autoTable({
      head: [labels],
      body: tableData,
    });
    doc.save('table-permission.pdf');
  };
  // ending of export to pdf

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Permission List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'User', href: paths.dashboard.user.root },
            { name: 'Permission' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.user.permissionnew}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Group
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        <div>
          <ExportToExcelButton data={dataFiltered} filename="Permission_Data" />
          <Button
            onClick={exportToPDF}
            style={divStyle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            variant="contained"
            startIcon={<Iconify icon="solar:export-bold" />}
          >
            PDF
          </Button>
        </div>
        {/* <div>
          <button onClick={exportToPDF}>Export to PDF</button>
        </div> */}
        <Card>
          <Tabs
            value={filters.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={(tab.value === 'all' && 'filled') || 'soft'}
                    color={
                      (tab.value === 'active' && 'success') ||
                      (tab.value === 'inactive' && 'warning') ||
                      'default'
                    }
                  >
                    {tab.value === 'all' && tableData.length}
                    {tab.value === 'active' && tableData.filter((user) => user.status === 1).length}

                    {tab.value === 'inactive' &&
                      tableData.filter((user) => user.status === 0).length}
                  </Label>
                }
              />
            ))}
          </Tabs>
          {/* <PermissionTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            roleOptions={_roles}
          /> */}
          {canReset && (
            <PermissionTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row._id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row._id)
                    )
                  }
                />
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <PermissionTableRow
                        key={row._id}
                        row={row}
                        selected={table.selected.includes(row._id)}
                        onSelectRow={() => table.onSelectRow(row._id)}
                        onDeleteRow={() => handleDeleteRow(row._id)}
                        onEditRow={() => handleEditRow(row._id)}
                      />
                    ))}
                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />
                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { name, status } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.user_group_name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    if (status === 'active') {
      inputData = inputData.filter((user) => user.status === 1);
    } else {
      inputData = inputData.filter((user) => user.status === 0);
    }
  }

  return inputData;
}
