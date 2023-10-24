import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    body: {
        borderRadius: '10px',
        borderColor:  'rgb(250, 250, 250)',
        borderStyle: 'solid',
        borderWidth: '2px',
        display: 'flex',
        flexDirection: 'column',
        padding: '5px',
        height: 'min-content'
    },

    helloUser: {
        "&.MuiTypography-root": {
            fontSize: '20px',
            textAlign: 'end'
        },
        color: 'rgb(250, 250, 250)',
    },

    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    logOut: {
        '&.MuiButton-text': {
            color: 'rgb(250, 250, 250)',
            fontSize: '15px',
            padding: 0,
            paddingLeft: '30px',
            paddingRight: '30px',
        },
        '&.MuiButton-root': {
            backgroundColor: 'rgb(130, 130, 124)',
            borderRadius: '15px',
        },
        width: 'fit-content',
        height: 'min-content',
        display: 'flex',
    },
})
export default useStyles;