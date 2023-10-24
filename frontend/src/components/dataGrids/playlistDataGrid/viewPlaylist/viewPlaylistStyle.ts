import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    playlistTitle: {
        "&.MuiTypography-root": {
            fontSize: '25px',
            textAlign: 'right',
            marginRight: '20px',
        },
        color: 'rgb(250, 250, 250)',
    },

    editButton: {
        backgroundColor: 'rgb(250, 250, 250)'
    },

    title: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
        gap: '15px'
    }

});

export default useStyles;