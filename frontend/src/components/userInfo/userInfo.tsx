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
    // move to login page* - done
    dispatch(resetCurrentUser());
    dispatch(resetCurrentSong());
    navigate(routesMapper[lOG_IN_PAGE_LABEL]); // '/' put in route obj - done
  };

  return (
    <div className={classes.body}>
      <Typography className={classes.helloUser}>
        {currentUser!.firstName} {currentUser!.lastName} {HELLO}{' '}
        {/* remove question marks - done */}
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
