import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    body: {
        backgroundColor: 'rgb(80, 87, 87)',
        '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
            backgroundColor: 'rgb(112, 106, 106)',
            borderRadius: '15px',
            width: '800px',
            maxWidth: '100vw',
        },
    },

    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '450px'
    },

    openDialog: {
        '&.MuiButton-text': {
            color: 'rgb(250, 250, 250)',
            fontSize: '15px',
            paddingTop: 0,
            paddingBottom: 0,

        },
        '&.MuiButton-root': {
            backgroundColor: 'rgb(185, 172, 172)',
            borderRadius: '15px',
        },
        display: 'flex',
        justifyContent: 'center',
    },

    title: {
        '&.MuiTypography-root': {
            fontSize: '50px',
            textAlign: 'center',
            padding: 0,
        },
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        color: 'rgb(250, 250, 250)',
        backgroundColor: 'rgb(74, 191, 117)',
    },

    field: {
        display: 'flex',
        flexDirection: 'row',
        direction: 'rtl',
        gap: '20px',
        borderBottom: '1px solid rgb(227, 227, 227)',
        alignItems: 'center'
    },

    fieldTitle: {
        "&.MuiTypography-root": {
            fontSize: '25px',
        },
        color: 'rgb(250, 250, 250)',
        width: '100px',
        textAlign: 'center',
        paddingRight: '40px'
    },

    actionButton: {
        '&.MuiButton-text': {
            color: 'rgb(250, 250, 250)',
            fontSize: '22px',
            padding: 0,
            width: '120px'
        },
        '&.MuiButton-root': {
            backgroundColor: 'rgb(72, 139, 42)',
            borderRadius: '20px'
        }
    },

    dialogAction: {
        '&.css-knqc4i-MuiDialogActions-root': {
            display: 'flex',
            justifyContent: 'center',
        }
    },

    autocomplete: {
        width: '200px',
        '& .css-i4bv87-MuiSvgIcon-root': {
            color: 'rgb(250, 250, 250)',
        },
        '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
            color: 'rgb(250, 250, 250)',

        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 0,
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 0
        },
    },

    inputText: {
        '& .css-1x51dt5-MuiInputBase-input-MuiInput-input': {
            color: 'rgb(250, 250, 250)'
        }
    },

    errorMassege: {
        '&.MuiTypography-root': {
            fontSize: '15px',
        },
        color: 'rgb(250, 50, 50)',
    },
});

export default useStyles;