
import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';

// @mui
import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
// import ListItemText from '@mui/material/ListItemText';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
//
// import UserQuickEditForm from './user-quick-edit-form';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
export default function ZoneTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  console.log(row);
  const { user_group_ref, screen_name, add_permission, edit_permission, delete_permission, export_permission, print_permission, enable_permission, status } = row

  const confirm = useBoolean()

  // const quickEdit = useBoolean()

  const popover = usePopover()
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       // const response = await axios.get('api/user/usergroups');
  //       // // const data = await response.json();

  //     console.log(row);


  //     } catch (error) {
  //       console.error('Error fetching API data:', error);
  //     }
  //   }

  //   fetchData();
  // });

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        {/* } <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} />

          <ListItemText
            primary={name}
            secondary={email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
          </TableCell> */}
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{user_group_ref.user_group_name}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{screen_name}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{add_permission?"YES":"NO"}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{edit_permission?"YES":"NO"}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{delete_permission?"YES":"NO"}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{export_permission?"YES":"NO"}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{print_permission?"YES":"NO"}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{enable_permission?"YES":"NO"}</TableCell>



        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 0 && 'warning') ||
              (status === 1 && 'success') ||
              'default'
            }
          >
            {status === 1 ? 'Active' : 'Inactive'}
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
            confirm.onTrue()
            popover.onClose()
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow()
            popover.onClose()
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow()
            popover.onClose()
          }}

        >
          <Iconify icon="solar:eye-bold" />
          AuditTrailView
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
  )
}

ZoneTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
}
