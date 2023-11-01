import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import useStyles from './deleteUserStyle';
import { changeCurrentUserByValue } from '../../../redux/UserSlice';
import { DELETE_USER } from '../../db/users/mutation';
import { useAppSelector } from '../../../redux/hooks';


const DELETE_USER_TEXT = 'מחק חשבון';
const CANCEL = 'ביטול';
const DIALOG_TEXT = '?אתה בטוח שברצונך למחוק את המשתמש הנוכחי';

const DeleteUser: React.FC = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mutationFunction] = useMutation(DELETE_USER); // rename
    const currentUser = useAppSelector((state) => state.user.value);

    const deleteUser = () => {
        mutationFunction({
            variables: {
                id: currentUser!.id,
            },
        })
        dispatch(changeCurrentUserByValue(undefined));
        navigate('/'); // route
    };

    return (
        <div>
            <Button
                onClick={() => setOpen(true)}
                className={classes.deleteUserButton}>
                {DELETE_USER_TEXT}
            </Button>

            <Dialog
                open={open}
                keepMounted // remove
                onClose={() => setOpen(false)}
                className={classes.body}
            >
                <DialogTitle >
                    {DIALOG_TEXT}
                </DialogTitle>

                <DialogActions className={classes.buttons}>
                    <Button
                        className={classes.cancelButton}
                        onClick={() => setOpen(false)}>
                        {CANCEL}
                    </Button>

                    <Button
                        className={classes.deleteUserButton}
                        onClick={deleteUser}>
                        {DELETE_USER_TEXT}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteUser;

