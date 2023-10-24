import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    body: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxHeight: '550px',
        textAlign: 'center',
        gap: '15px',
        alignItems: 'center',
    },

    title: {
        "&.MuiTypography-root": {
            fontSize: '50px',
            textAlign: 'center',
        },
        color: 'rgb(250, 250, 250)',
        backgroundColor: 'rgb(74, 191, 117)',
        borderRadius: '20px',
        width: '100%'
    },

    tables: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        // height: '100%',
        overflow: 'auto'
    },

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
        // alignItems: 'center',
        // justifyContent: 'start',
    },
});

export default useStyles;