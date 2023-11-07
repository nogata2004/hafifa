import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Select, MenuItem, Typography } from '@mui/material';

import useStyles from './logInPageStyle';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_USERS } from '../../components/db/users/query';
import User from '../../types/user';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  changeCurrentUserByValue,
  resetCurrentUser,
} from '../../redux/UserSlice';
import { SONG_TABLE_LABEL, routesMapper } from '../../routes/routes';

const TITLE = 'spoofy';
const SELECT_LABEL = 'בחר משתמש להתחברות'; // select-label - done
const BUTTON = 'התחבר';

const LogInPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.value);

  useEffect(() => {
    console.log(currentUser);
    if (!!currentUser) {
      dispatch(resetCurrentUser());
    }
  }, []);

  useQuery(GET_ALL_USERS, {
    onCompleted: (data: { allUsers: { nodes: User[] } }) => {
      const users: User[] = data.allUsers.nodes;
      setUsers(users);
    },
  });

  const moveToMainPage = () => {
    if (!!currentUser) {
      navigate(routesMapper[SONG_TABLE_LABEL]);
    }
    // make routes const (object) - done
  };

  const changeCurrentUser = (selectedUser: User) => {
    dispatch(changeCurrentUserByValue(selectedUser));
  };

  return (
    <div className={classes.body}>
      <Typography className={classes.spoofyText}>{TITLE}</Typography>

      <Select
        className={classes.selectConect}
        defaultValue={SELECT_LABEL}
        //label - done (did defaultValue)
      >
        <MenuItem id={SELECT_LABEL} value={SELECT_LABEL} disabled>
          {SELECT_LABEL}
        </MenuItem>

        {users.map((user) => (
          <MenuItem
            id={user.id}
            key={user.id}
            value={user.id}
            onClick={() => changeCurrentUser(user)}
          >
            {user.firstName}
          </MenuItem>
        ))}
      </Select>

      <Button
        onClick={moveToMainPage}
        className={classes.buttonConnect} // typo - done
      >
        {BUTTON}
      </Button>
    </div>
  );
};
export default LogInPage;
