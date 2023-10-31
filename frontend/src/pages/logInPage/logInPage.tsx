import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button, FormControl, Select, MenuItem, Typography, InputLabel } from '@mui/material';

import useStyles from './logInPageStyle';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_USERS } from '../../components/db/users/query';
import User from '../../types/user';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeCurrentUserByValue } from '../../redux/UserSlice';
import mode from '../../types/mode';


const TITLE = 'spoofy';
const SELECT_TITLE = 'בחר משתמש להתחברות';
const BUTTON = 'התחבר';

const LogInPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => state.user.value);

    useQuery(GET_ALL_USERS, {
        onCompleted: (data: { allUsers: { nodes: User[] } }) => {
            const users: User[] = data.allUsers.nodes;
            setUsers(users);
        }
    });

    const moveToMainPage = () => {
        currentUser && navigate('/spoofy');
    };

    const changeCurrentUser = (selectedUser: User) => {
        dispatch(changeCurrentUserByValue(selectedUser));
    };

    return (
        <div className={classes.body}>
            <Typography className={classes.spoofyText}>
                {TITLE}
            </Typography>

            <FormControl>
                <InputLabel
                    focused={false}
                    className={classes.inputLabel}>
                    {SELECT_TITLE}
                </InputLabel>

                <Select
                    className={classes.selectConect}
                    defaultValue={''}
                >
                    {users.map((user) => (
                        <MenuItem
                            key={user.id}
                            id={user.id}
                            value={user.id}
                            onClick={() => changeCurrentUser(user)}>
                            {user.firstName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                onClick={moveToMainPage}
                className={classes.buttonConect}
            >
                {BUTTON}
            </Button>
        </div>
    );
};
export default LogInPage;