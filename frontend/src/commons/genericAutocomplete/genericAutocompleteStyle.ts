import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
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

    errorMassege: {
        '&.MuiTypography-root': {
            fontSize: '15px',
        },
        color: 'rgb(250, 50, 50)',
    },
});

export default useStyles;