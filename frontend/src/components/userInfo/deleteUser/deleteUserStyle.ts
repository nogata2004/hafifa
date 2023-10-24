import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    body: {
        backgroundColor: 'rgb(112, 106, 106)',
        display: 'flex',
        flexDirection: 'column',
    },

    deleteUserButton: {
        '&.MuiButton-text': {
            color: 'rgb(250, 250, 250)',
            fontSize: '15px',
            padding: 0,
            paddingLeft: '30px',
            paddingRight: '30px',
        },
        '&.MuiButton-root': {
            backgroundColor: 'rgb(191, 90, 74)',
            borderRadius: '15px',
            marginRight: '10px',

        },
        width: 'fit-content',
        height: 'min-content',
        display: 'flex',
    },

    cancelButton: {
        '&.MuiButton-text': {
            color: 'rgb(191, 90, 74)',
            fontSize: '15px',
            padding: 0,
            paddingLeft: '30px',
            paddingRight: '30px',
        },
        '&.MuiButton-root': {
            backgroundColor: 'rgb(250, 250, 250)',
            borderRadius: '15px',
            marginRight: '10px',
        },
        width: 'fit-content',
        height: 'min-content',
        display: 'flex',
    },

    buttons: {
        display: 'flex',
        flexDirection: 'row',
    }
})
export default useStyles;