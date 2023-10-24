import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useStyles from './userInfoStyle';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import DeleteUser from './deleteUser/deleteUser';
import { changeCurrentUserByValue } from '../../redux/UserSlice';
import { changeCurrentModeByValue } from '../../redux/ModeSlice';
import Mode from '../../types/mode';
import { resetCurrentSong } from '../../redux/SongSlice';


const HELLO = ',היי';
const LOG_OUT = 'התנתקות';

const UserInfo: React.FC = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const currentUser = useAppSelector((state) => state.user.value);
    const dispatch = useAppDispatch();

    const moveToMainPage = () => {
        dispatch(changeCurrentUserByValue(undefined));
        dispatch(changeCurrentModeByValue(Mode.song));
        dispatch(resetCurrentSong());
        navigate('/');
    };

    return (
        <div className={classes.body}>
            <Typography className={classes.helloUser}>
                {currentUser?.firstName} {currentUser?.lastName} {HELLO}
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
