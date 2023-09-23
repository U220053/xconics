/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-sequences */
import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';

// @mui
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
// eslint-disable-next-line react/prop-types
export default function DeviceTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  // console.log("row", row);
  const { device_qr_code, production_batch_no, mac_id, activation_date, status } = row;
  console.log("production_batch_no", production_batch_no);
  const confirm = useBoolean();
  const popover = usePopover();
  useEffect(() => {
    async function fetchData() {
      try {
        // console.log(row);
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    }
    fetchData();
  });

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{device_qr_code}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{production_batch_no?.batch_id || 'NA'}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{mac_id}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{activation_date}</TableCell>
        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 1 && 'success') ||
              (status === 0 && 'warning') ||
              (status === 2 && 'info') ||
              (status === 3 && 'primary') ||
              (status === 4 && 'secondary') ||
              'default'
            }
          >
            {(() => {
              if (status === 1) {
                return 'active';
              } else if(status ===0){
                return 'inactive';
              } else if(status === 2){
                return 'issued';
              } else if(status === 3){
                return 'maintenance';
              } else{
                return 'breakdown';
              }
            })()}
          </Label>
        </TableCell>
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}

DeviceTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
