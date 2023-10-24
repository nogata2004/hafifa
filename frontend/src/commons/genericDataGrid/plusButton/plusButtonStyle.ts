import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    tableButton: {
        '&.MuiIconButton-root': {
            color: 'rgb(250, 250, 250)',
        },
    },

    popover: {
        '& .css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
            borderRadius: 0,
            boxShadow: '0px 0px 0px 0px',
        }
    },

    popoverTrue: {
        '& .css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
            borderRadius: 0,
            boxShadow: '0px 0px 0px 0px',
            border: '8px solid rgb(191, 90, 74)',
        }
    },

    popoverFalse: {
        '& .css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
            borderRadius: 0,
            boxShadow: '0px 0px 0px 0px',
            border: '8px solid rgb(74, 191, 117)',
        }
    },

    popoverTitle: {
        borderBottom: '1px solid rgb(250, 250, 250)',
        backgroundColor: 'rgb(191, 177, 177)',
        textAlign: 'center',
        color: 'rgb(250, 250, 250)',
        padding: '2px'
    },
});

export default useStyles;



