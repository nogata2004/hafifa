import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useStyles from './userInfoStyle';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import DeleteUser from './deleteUser/deleteUser';
import { resetCurrentUser } from '../../redux/UserSlice';
import { resetCurrentSong } from '../../redux/SongSlice';
import { lOG_IN_PAGE_LABEL, routesMapper } from '../../routes/routes';

const HELLO = ',היי';
const LOG_OUT = 'התנתקות';

const UserInfo: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  const moveToLoginPage = () => {
    dispatch(resetCurrentUser());
    dispatch(resetCurrentSong());
    navigate(routesMapper[lOG_IN_PAGE_LABEL]); // call the route enum : todo
  };

  return (
    <div className={classes.body}>
      <Typography className={classes.helloUser}>
        {currentUser!.firstName} {currentUser!.lastName} {HELLO}{' '}
        {/* use `${}`*/}
      </Typography>

      <div className={classes.buttons}>
        <DeleteUser />

        <Button onClick={moveToLoginPage} className={classes.logOut}>
          {LOG_OUT}
        </Button>
      </div>
    </div>
  );
};
export default UserInfo;
