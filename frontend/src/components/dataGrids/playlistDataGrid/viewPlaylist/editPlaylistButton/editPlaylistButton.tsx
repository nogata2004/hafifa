import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { UseFormReturn } from 'react-hook-form';
import React, { useContext } from 'react';

import useStyles from './editPlaylistButtonStyle';
import Playlist from '../../../../../types/playlist';
import GenericDialog from '../../../../../commons/genericDialog/genericDialog';
import GenericAutocomplete from '../../../../../commons/genericAutocomplete/genericAutocomplete';
import GenericTextField from '../../../../../commons/genericTextField/genericTextField';
import { useEditPlaylist } from './useEditPlaylist';
import { AllSpoofyContext } from '../../../../db/context';
import { PlaylistKeys } from '../../playlistDataGrid';

const NAME = 'שם';
const SONGS = 'שירים';
const SUBMIT_BUTTON_TEXT = 'שמור';
const DIALOG_TITLE = 'עריכת פלייליסט';

interface Props {
  currentPlaylist: Playlist;
  methods: UseFormReturn<any, any, undefined>;
  setCurrentPlaylist: React.Dispatch<
    React.SetStateAction<Playlist | undefined>
  >;
}

const EditPlaylistButton: React.FC<Props> = ({
  // this is a button!!! done
  currentPlaylist,
  methods,
  setCurrentPlaylist,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const { songs } = useContext(AllSpoofyContext);
  const { actionEditPlaylist, openDialog } = useEditPlaylist({
    methods,
    setOpen,
    currentPlaylist,
    setCurrentPlaylist,
  });

  return (
    <div>
      <IconButton onClick={openDialog}>
        <EditIcon className={classes.editButton} />
      </IconButton>

      <GenericDialog
        open={open}
        setOpen={setOpen}
        submitText={SUBMIT_BUTTON_TEXT}
        dialogTitle={DIALOG_TITLE}
        methods={methods}
        submitAction={actionEditPlaylist}
      >
        <div>
          <GenericTextField
            fieldTitle={NAME}
            errorsMasssege={
              methods.formState.errors[PlaylistKeys.NAME]?.message
            }
            fieldName={PlaylistKeys.NAME} // Keys enum done
          />

          <GenericAutocomplete
            fieldTitle={SONGS}
            errorsMasssege={
              methods.formState.errors[PlaylistKeys.INPOUT_SONG]?.message
            }
            options={songs}
            isMulitple={true}
            fieldName={PlaylistKeys.INPOUT_SONG} // done enum
          />
        </div>
      </GenericDialog>
    </div>
  );
};

export default EditPlaylistButton;
