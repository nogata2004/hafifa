import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    body: {
        height: '98vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '20px'
    },

    table: {
        display: 'flex',
        alignItems: 'start',
        paddingTop: '100px'
    },

    mainPart: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})
export default useStyles;