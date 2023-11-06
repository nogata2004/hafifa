import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    body: {
        display: 'flex',
        flexDirection: 'column',
        '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': { // try to change the selector - to do
            borderRadius: '10px'
        },
        // '&.MuiPaper-root .MuiPaper-elevation .MuiPaper-rounded .MuiPaper-elevation24 .MuiDialog-paper .MuiDialog-paperScrollPaper .MuiDialog-paperWidthSm .css-1t1j96h-MuiPaper-root-MuiDialog-paper' :{
        //     borderRadius: '10px'
        // }
    },

    deleteUserButton: {
        '&.MuiButton-text': {
            color: 'rgb(250, 250, 250)',
            fontSize: '15px',
            padding: '0 30px',  // shorthand padding syntax '0 30px' - done
        },
        '&.MuiButton-root': {
            backgroundColor: 'rgb(191, 90, 74)',
            borderRadius: '15px',
            marginRight: '10px',

        },
        '&.MuiButton-root:hover': {
            backgroundColor: 'rgb(191, 90, 74)',
        },
        width: 'fit-content',
        height: 'fit-content', // .
        display: 'flex',
    },

    cancelButton: {
        '&.MuiButton-text': {
            color: 'rgb(250, 250, 250)',
            fontSize: '15px',
            padding: 0, // .
            paddingLeft: '30px',
            paddingRight: '30px',
        },
        '&.MuiButton-root': {
            backgroundColor: 'rgb(130, 130, 124)',
            borderRadius: '15px',
            marginRight: '10px',
        },
        '&.MuiButton-root:hover': {
            backgroundColor: 'rgb(130, 130, 124)',
        },
        width: 'fit-content',
        display: 'flex',
    },

    buttons: {
        '&.css-knqc4i-MuiDialogActions-root': { // seletor - to do 
            justifyContent: 'center'
        }
    }
})
export default useStyles;