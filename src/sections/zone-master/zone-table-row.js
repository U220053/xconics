import PropTypes from 'prop-types';

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
  const {
    area_name,
    svg_tag,
    floor,
    zone_type,
    zone_default_color_code,
    zone_alert_color_code,
    zone_gateway,
    zone_remarks,
    status,
  } = row;

  const confirm = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{area_name}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{svg_tag}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{floor.floor_name}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{zone_type}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{zone_default_color_code}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{zone_alert_color_code}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{zone_gateway}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{zone_remarks}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={(status === 0 && 'warning') || (status === 1 && 'success') || 'default'}
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

ZoneTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
