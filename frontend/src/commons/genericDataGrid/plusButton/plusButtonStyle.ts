import { makeStyles } from '@mui/styles';

const useStyles = makeStyles<boolean | undefined>({
    tableButton: {
        '&.MuiIconButton-root': {
            color: 'rgb(250, 250, 250)',
        },
    },

    popover: {
        '& .css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
            borderRadius: 0,
            boxShadow: '0px 0px 0px 0px', // todo put 0
            border: (includePlaylist) => (
                includePlaylist === false ?
                    '8px solid rgb(74, 191, 117)' :
                    includePlaylist === true &&
                    '8px solid rgb(191, 90, 74)'
            )
        }
    },

    popoverTitle: {
        borderBottom: '1px solid rgb(250, 250, 250)',
        backgroundColor: 'rgb(191, 177, 177)',
        textAlign: 'center',
        color: 'rgb(250, 250, 250)',
        padding: '2px',
    },

    addedMassege: {
        textAlign: 'center',
        color: 'rgb(250, 250, 250)',
        backgroundColor: (includePlaylist) => (
            includePlaylist === false ?
                'rgb(74, 191, 117)' : 'rgb(191, 90, 74)'
        )
    },

});

export default useStyles;