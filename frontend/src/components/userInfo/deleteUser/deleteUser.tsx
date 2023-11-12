import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import useStyles from './deleteUserStyle';
import { resetCurrentUser } from '../../../redux/UserSlice';
import { DELETE_USER } from '../../db/users/mutation';
import { useAppSelector } from '../../../redux/hooks';
import { routeMapper } from '../../../routes/routes';

const DELETE_USER_TEXT = 'מחק חשבון';
const CANCEL = 'ביטול';
const DIALOG_TEXT = '?אתה בטוח שברצונך למחוק את המשתמש הנוכחי';

const DeleteUser: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteUser] = useMutation(DELETE_USER); // remove 'mutation' - done
  const currentUser = useAppSelector((state) => state.user.value);

  const deleteCurrentUser = () => {
    deleteUser({
      variables: {
        id: currentUser!.id,
      },
    });
    dispatch(resetCurrentUser());
    navigate(routeMapper.LOGIN); // route enumm- done
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        className={classes.deleteUserButton}
      >
        {DELETE_USER_TEXT}
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className={classes.body}
      >
        <DialogTitle>{DIALOG_TEXT}</DialogTitle>

        <DialogActions className={classes.buttons}>
          <Button
            className={classes.cancelButton}
            onClick={() => setOpen(false)}
          >
            {CANCEL}
          </Button>

          <Button
            className={classes.deleteUserButton}
            onClick={deleteCurrentUser}
          >
            {DELETE_USER_TEXT}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteUser;
