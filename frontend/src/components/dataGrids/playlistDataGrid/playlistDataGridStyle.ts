import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    body: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxHeight: '550px', // % // why max ? 
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
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '8px'
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(250,250,250,.5)',
            outline: '1px solid slategrey',
            borderRadius: '5px'
        },
    },
});

export default useStyles;