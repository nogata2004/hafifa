import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Select, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useStyles from './logInPageStyle';
import { GET_ALL_USERS } from '../../components/db/users/query';
import User from '../../types/user';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  changeCurrentUserByValue,
  resetCurrentUser,
} from '../../redux/UserSlice';
import { RouteMapper } from '../../routes/routes';

const TITLE = 'spoofy';
const SELECT_LABEL = 'בחר משתמש להתחברות';
const BUTTON = 'התחבר';

const LogInPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.value);

  useEffect(() => {
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
      navigate(RouteMapper.SONG);
    }
    // make routes const (object) - done
  };

  const changeCurrentUser = (selectedUser: User) => {
    dispatch(changeCurrentUserByValue(selectedUser));
  };

  return (
    <div className={classes.body}>
      <Typography className={classes.spoofyText}>{TITLE}</Typography>

      <Select className={classes.selectConect} defaultValue={SELECT_LABEL}>
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

      <Button onClick={moveToMainPage} className={classes.buttonConnect}>
        {BUTTON}
      </Button>
    </div>
  );
};
export default LogInPage;
