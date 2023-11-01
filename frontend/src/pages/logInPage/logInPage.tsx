import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button, FormControl, Select, MenuItem, Typography, InputLabel } from '@mui/material';

import useStyles from './logInPageStyle';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_USERS } from '../../components/db/users/query';
import User from '../../types/user';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeCurrentUserByValue } from '../../redux/UserSlice';
import mode from '../../types/mode'; //unused


const TITLE = 'spoofy';
const SELECT_TITLE = 'בחר משתמש להתחברות'; // select-label
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
        currentUser && navigate('/spoofy'); // make routes const (object)
    };

    const changeCurrentUser = (selectedUser: User) => {
        dispatch(changeCurrentUserByValue(selectedUser));
    };

    return (
        <div className={classes.body}>
            <Typography className={classes.spoofyText}>
                {TITLE}
            </Typography>
            // unnecssary?
            <FormControl> 
                <InputLabel // same here? check label
                    focused={false}
                    className={classes.inputLabel}>
                    {SELECT_TITLE}
                </InputLabel>

                <Select
                    className={classes.selectConect}
                    defaultValue={''}
                    //label
                >
                    {users.map((user) => (
                        <MenuItem
                            key={user.id}
                            id={user.id} // unnecssary
                            value={user.id}
                            onClick={() => changeCurrentUser(user)}>
                            {user.firstName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                onClick={moveToMainPage}
                className={classes.buttonConect} // typo
            >
                {BUTTON}
            </Button>
        </div>
    );
};
export default LogInPage;