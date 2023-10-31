import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    logo: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '30px'
    },

    spoofyText: {
        "&.MuiTypography-root": {
            fontSize: '50px',
            padding: 0,
            margin: 0
        },
        fontFamily: 'Tahoma',
        color: 'rgb(250, 250, 250)',
        textAlign: 'end',
        height: 'min-content'
    },

    spoofyPic: {
        width: '70px',
        height: '70px',
    },

    sideBar: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },

    optionButton: {
        '&.MuiListItemButton-root': {
            fontSize: '25px',
            justifyContent: 'center',
            marginBottom: '25px',
            fontFamily: 'sans-serif',
            borderRadius: '5px',
            backgroundColor: 'rgb(191, 177, 177)',
            color: 'rgb(250, 250, 250)',
            '&.Mui-selected': {
                backgroundColor: 'rgb(74, 191, 117)'
            },
            '&.Mui-selected:hover': {
                backgroundColor: 'rgb(74, 191, 117)'
            },
        },
        '&.MuiListItemButton-root:hover': {
            backgroundColor: 'rgb(191, 177, 177)',
        },
        width: '230px',
    },
})
export default useStyles;