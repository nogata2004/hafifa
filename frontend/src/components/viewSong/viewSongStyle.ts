import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    body: {
        backgroundColor: 'rgb(112, 106, 106)',
        display: 'flex',
        flexDirection: 'column',
        paddingRight: '30px',
        paddingLeft: '30px',
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0
    },

    appPart: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    title: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        right: '40px'
    },

    controls: {
        display: 'flex',
        flexDirection: 'row',
    },

    slidesStopButtons: {
        width: '50px',
        height: '50px',
    },

    userName: {
        '&.MuiTypography-root': {
            fontSize: '20px',
            textAlign: 'end'
        },
        color: 'rgb(250, 250, 250)',
    },

    songName: {
        '&.MuiTypography-root': {
            fontSize: '15px',
            textAlign: 'end'
        },
        color: 'rgb(250, 250, 250)',
    },

    line: {
        '&.MuiSlider-root': {
            color: 'rgb(250, 250, 250)',
        }
    },

    time: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },



})
export default useStyles;