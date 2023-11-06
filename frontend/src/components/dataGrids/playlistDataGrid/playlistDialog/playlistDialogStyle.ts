import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    openDialog: {
        '&.MuiButton-text': {
            color: 'rgb(250, 250, 250)',
            fontSize: '15px',
            paddingTop: 0,
            paddingBottom: 0,
            width: 'fit-content'
        },
        '&.MuiButton-root': {
            backgroundColor: 'rgb(185, 172, 172)',
            borderRadius: '15px',
        },
        display: 'flex',
    },
});

export default useStyles;