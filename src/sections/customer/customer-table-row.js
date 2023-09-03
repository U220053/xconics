// /* eslint-disable react/jsx-no-comment-textnodes */
// /* eslint-disable no-sequences */
// import PropTypes from 'prop-types';
// import { useState, useCallback,useEffect } from 'react';

// // @mui
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
// import TableCell from '@mui/material/TableCell';
// import IconButton from '@mui/material/IconButton';
// import ListItemText from '@mui/material/ListItemText';
// // hooks
// import { useBoolean } from 'src/hooks/use-boolean';
// // components
// import Label from 'src/components/label';
// import Iconify from 'src/components/iconify';
// import CustomPopover, { usePopover } from 'src/components/custom-popover';
// import { ConfirmDialog } from 'src/components/custom-dialog';
// //
// import UserQuickEditForm from './user-quick-edit-form';

// // ----------------------------------------------------------------------

// // eslint-disable-next-line react/prop-types
// export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow}) {
//   const {user_group_name,user_group_description,status} = row;

//   const confirm = useBoolean();

//   const quickEdit = useBoolean();

//   const popover = usePopover();
//   // useEffect(() => {
//   //   async function fetchData() {
//   //     try {
//   //       // const response = await axios.get('api/user/usergroups');
//   //       // // const data = await response.json();

//   //     console.log(row);

//   //     } catch (error) {
//   //       console.error('Error fetching API data:', error);
//   //     }
//   //   }

//   //   fetchData();
//   // });

//   return (
//     <>
//       <TableRow hover selected={selected}>
//         <TableCell padding="checkbox">
//           <Checkbox checked={selected} onClick={onSelectRow} />
//         </TableCell>

//        {/* } <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
//           <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} />

//           <ListItemText
//             primary={name}
//             secondary={email}
//             primaryTypographyProps={{ typography: 'body2' }}
//             secondaryTypographyProps={{
//               component: 'span',
//               color: 'text.disabled',
//             }}
//           />
//           </TableCell> */}

//         <TableCell sx={{ whiteSpace: 'nowrap' }}>{user_group_name}</TableCell>

//         <TableCell sx={{ whiteSpace: 'nowrap' }}>{user_group_description}</TableCell>

//         <TableCell>
//           <Label
//             variant="soft"
//             color={
//               (status === 0 && 'success') ||
//               (status === 1 && 'warning') ||
//               'default'
//             }
//           >
//             {status===1?'Active':'InActive'}
//           </Label>
//         </TableCell>

//         // <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
//         //   <Tooltip title="Quick Edit" placement="top" arrow>
//         //     <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
//         //       <Iconify icon="solar:pen-bold" />
//         //     </IconButton>
//         //   </Tooltip>

//         //   <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
//         //     <Iconify icon="eva:more-vertical-fill" />
//         //   </IconButton>
//         // </TableCell>

//       </TableRow>

//       // <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

//       <CustomPopover
//         open={popover.open}
//         onClose={popover.onClose}
//         arrow="right-top"
//         sx={{ width: 140 }}
//       >
//         <MenuItem
//           onClick={() => {
//             confirm.onTrue();
//             popover.onClose();
//           }}
//           sx={{ color: 'error.main' }}
//         >
//           <Iconify icon="solar:trash-bin-trash-bold" />
//           Delete
//         </MenuItem>

//         <MenuItem
//           onClick={() => {
//             onEditRow();
//             popover.onClose();
//           }}
//         >
//           <Iconify icon="solar:pen-bold" />
//           Edit
//         </MenuItem>
//       </CustomPopover>

//       <ConfirmDialog
//         open={confirm.value}
//         onClose={confirm.onFalse}
//         title="Delete"
//         content="Are you sure want to delete?"
//         action={
//           <Button variant="contained" color="error" onClick={onDeleteRow}>
//             Delete
//           </Button>
//         }
//       />
//     </>
//   );
// }

// UserTableRow.propTypes = {
//   onDeleteRow: PropTypes.func,
//   onEditRow: PropTypes.func,
//   onSelectRow: PropTypes.func,
//   row: PropTypes.object,
//   selected: PropTypes.bool,
// };
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
//
// import UserQuickEditForm from './user-quick-edit-form';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
export default function CustomerTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const {
    customer_group_name,
    customer_person_name,
    customer_phone,
    customer_contact_email,
    customer_address,
    customer_city,
    customer_state,
    customer_pin,
    customer_admin_email,
    customer_admin_phone,
    customer_activation_date,
    customer_term_exp_date,
    customer_client_,
    customer_client_date,
    customer_select_group,
    status,
  } = row;

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       // const response = await axios.get('api/customer/usergroups');
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

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{customer_group_name}</TableCell>

        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>{user_group_description}</TableCell> */}

        <TableCell>
          <Label
            variant="soft"
            color={(status === 0 && 'warning') || (status === 1 && 'success') || 'default'}
          >
            {status === 1 ? 'Active' : 'InActive'}
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

CustomerTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
