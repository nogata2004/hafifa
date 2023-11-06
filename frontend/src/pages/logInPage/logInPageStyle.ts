import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    body: {
        height: '98vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '70px'
    },

    spoofyText: {
        '&.MuiTypography-root': {
            fontSize: '120px',
        },
        color: 'rgb(74, 192, 117)',
        textShadow: '4px 4px 6px rgb(0, 0, 0)'
    },

    selectConect: {
        '&.MuiOutlinedInput-notchedOutline': {
            border: 0,
        },
        '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 0
        },
        '&.css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root': {
            backgroundColor: 'rgb(112, 106, 106)',
            direction: 'rtl',
            fontSize: '25px',
            color: 'rgb(250, 250, 250)',
        },
        '& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon': {
            color: 'rgb(250, 250, 250)',
            direction: 'ltr', // ?
            position: 'initial', // ?
            fontSize: '50px'
        },
        '& .css-bpeome-MuiSvgIcon-root-MuiSelect-icon': {
            color: 'rgb(250, 250, 250)',
            position: 'initial', // ?
            fontSize: '50px'
        },
        width: '350px',
    },

    inputLabel: {
        '&.css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
            fontSize: '26px',
            color: 'rgb(250, 250, 250)',
            textAlign: 'center',
            marginLeft: '50px'
        },
    },

    buttonConnect: {
        '&.MuiButton-text': {
            color: 'rgb(250, 250, 250)',
            fontSize: '20px',
            paddingLeft: '30px',
            paddingRight: '30px',
        },
        '&.MuiButton-root': {
            backgroundColor: 'rgb(70, 138, 41)',
            borderRadius: '15px',
        },
        width: 'fit-content',
        display: 'flex',
    }
})
export default useStyles;