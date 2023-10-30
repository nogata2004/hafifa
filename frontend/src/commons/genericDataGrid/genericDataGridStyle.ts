import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    table: {
        backgroundColor: 'rgb(112, 106, 106)',
        padding: '30px',
        '&.css-c5c7cs-MuiDataGrid-root': {
            border: 0,
            borderRadius: '20px',
            color: 'rgb(250, 250, 250)',
            direction: 'rtl',
            fontSize: '19px',
            width: '1000px',
        },
        '&.css-1lymaxv-MuiDataGrid-root .MuiDataGrid-row:hover, .css-1lymaxv-MuiDataGrid-root .MuiDataGrid-row.Mui-hovered': {
            backgroundColor: 'rgb(130, 129, 129)'
        },
        '&.css-1lymaxv-MuiDataGrid-root .MuiDataGrid-row.Mui-selected': {
            backgroundColor: 'rgb(129, 129, 129)'
        },
        '&.css-1lymaxv-MuiDataGrid-root .MuiDataGrid-row.Mui-selected:hover, .css-1lymaxv-MuiDataGrid-root .MuiDataGrid-row.Mui-selected.Mui-hovered': {
            backgroundColor: 'rgb(129, 129, 129)'
        },
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none'
        },
        '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus': {
            outline: 'none'
        },
        marginBottom: '30px',
    },

    header: {
        borderLeft: '1px solid'
    },

    favoriteSeil: {
        '&:focus-within': {
            outline: "none !important"
        }
    }
});

export default useStyles;