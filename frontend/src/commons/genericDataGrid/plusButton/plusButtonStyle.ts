import { makeStyles } from '@mui/styles';
import { PlaylistMode } from './PlusButton';

interface Props {
  currentPlaylistMode: PlaylistMode;
}

const useStyles = makeStyles({
  tableButton: {
    '&.MuiIconButton-root': {
      color: 'rgb(250, 250, 250)',
    },
  },

  popover: {
    '& .css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
      borderRadius: 0,
      boxShadow: 0, // done put 0
      border: ({ currentPlaylistMode }: Props) =>
        currentPlaylistMode === PlaylistMode.NOT_EXIST
          ? '8px solid rgb(74, 191, 117)'
          : currentPlaylistMode === PlaylistMode.EXIST &&
            '8px solid rgb(191, 90, 74)',
    },
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
    backgroundColor: ({ currentPlaylistMode }: Props) =>
      currentPlaylistMode === PlaylistMode.NOT_EXIST
        ? 'rgb(74, 191, 117)'
        : 'rgb(191, 90, 74)',
  },
});

export default useStyles;
