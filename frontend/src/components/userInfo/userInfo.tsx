import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useStyles from './userInfoStyle';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import DeleteUser from './deleteUser/deleteUser';
import { changeCurrentUserByValue } from '../../redux/UserSlice';
import { resetCurrentSong } from '../../redux/SongSlice';


const HELLO = ',היי';
const LOG_OUT = 'התנתקות';

const UserInfo: React.FC = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const currentUser = useAppSelector((state) => state.user.value);
    const dispatch = useAppDispatch();

    const moveToMainPage = () => { // move to login page*
        dispatch(changeCurrentUserByValue(undefined));
        dispatch(resetCurrentSong());
        navigate('/'); // '/' put in route obj
    };

    return (
        <div className={classes.body}>
            <Typography className={classes.helloUser}>
                {currentUser?.firstName} {currentUser?.lastName} {HELLO} {/* remove question marks */}
            </Typography>

            <div className={classes.buttons}>
                <DeleteUser />

                <Button
                    onClick={moveToMainPage}
                    className={classes.logOut}>
                    {LOG_OUT}
                </Button>
            </div>
        </div>
    );
};
export default UserInfo;
