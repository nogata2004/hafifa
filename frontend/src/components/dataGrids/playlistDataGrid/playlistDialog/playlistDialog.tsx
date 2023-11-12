import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

import useStyles from './playlistDialogStyle';
import GenericDialog from '../../../../commons/genericDialog/genericDialog';
import GenericTextField from '../../../../commons/genericTextField/genericTextField';
import { AllSpoofyContext } from '../../../db/context';
import GenericAutocomplete from '../../../../commons/genericAutocomplete/genericAutocomplete';
import { usePlaylistDialog } from './usePlaylistDialog';
import Playlist from '../../../../types/playlist';
import { PlaylistKeys } from '../playlistDataGrid';

const NAME = 'שם';
const SONGS = 'שירים';
const BUTTON_TEXT = '+צור פלייליסט חדש';
const SUBMIT_BUTTON_TEXT = 'צור פלייליסט';
const DIALOG_TITLE = 'יצירת פלייליסט';

interface Props {
  methods: UseFormReturn<any, any, undefined>;
  setCurrentPlaylist: React.Dispatch<
    React.SetStateAction<Playlist | undefined>
  >;
}

const PlaylistDialog: React.FC<Props> = ({ methods, setCurrentPlaylist }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const { songs } = useContext(AllSpoofyContext);
  const { actionAddPlaylist } = usePlaylistDialog({
    methods,
    setOpen,
  });

  const openDialog = () => {
    setOpen(true);
    setCurrentPlaylist(undefined);
  };

  return (
    <div>
      <Button onClick={openDialog} className={classes.openDialog}>
        {BUTTON_TEXT}
      </Button>

      <GenericDialog
        open={open}
        setOpen={setOpen}
        submitText={SUBMIT_BUTTON_TEXT}
        dialogTitle={DIALOG_TITLE}
        methods={methods}
        submitAction={actionAddPlaylist}
      >
        <div>
          <GenericTextField
            fieldTitle={NAME}
            errorsMasssege={
              methods.formState.errors[PlaylistKeys.NAME]?.message
            }
            fieldName={PlaylistKeys.NAME} // done dialogkeys
          />

          <GenericAutocomplete
            fieldTitle={SONGS}
            errorsMasssege={
              methods.formState.errors[PlaylistKeys.INPOUT_SONG]?.message
            }
            options={songs}
            isMulitple={true}
            fieldName={PlaylistKeys.INPOUT_SONG}
          />
        </div>
      </GenericDialog>
    </div>
  );
};

export default PlaylistDialog;
