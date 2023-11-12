import React, { useState } from 'react';
import { Button } from '@mui/material';

import GenericDialog from '../../../../commons/genericDialog/genericDialog';
import useStyles from '../../playlistDataGrid/playlistDialog/playlistDialogStyle';
import GenericTextField from '../../../../commons/genericTextField/genericTextField';
import GenericAutocomplete from '../../../../commons/genericAutocomplete/genericAutocomplete';
import Artist from '../../../../types/artist';
import { DialogKeys, useSongDialog } from './useSongDialog';

const SUBMIT_BUTTON_TEXT = 'צור שיר';
const DIALOG_TITLE = 'יצירת שיר';
const BUTTON_TEXT = '+צור שיר';
const NAME = 'שם';
const ARTIST = 'זמר';
const DURATION = 'משך שיר';

const SongDialog: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [artists, setArtists] = useState<Artist[]>([]);
  const { methods, addSong } = useSongDialog({
    setArtists,
    setOpen,
  });

  return (
    <div>
      <Button onClick={() => setOpen(true)} className={classes.openDialog}>
        {BUTTON_TEXT}
      </Button>

      <GenericDialog
        open={open}
        setOpen={setOpen}
        submitText={SUBMIT_BUTTON_TEXT}
        dialogTitle={DIALOG_TITLE}
        methods={methods}
        submitAction={addSong}
      >
        <div>
          <GenericTextField
            fieldTitle={NAME}
            errorsMasssege={methods.formState.errors[DialogKeys.NAME]?.message}
            fieldName={DialogKeys.NAME} // done: use dialogkeys.
          />

          <GenericAutocomplete
            fieldTitle={ARTIST}
            errorsMasssege={
              methods.formState.errors[DialogKeys.ARTIST]?.message
            }
            options={artists}
            isMulitple={false}
            fieldName={DialogKeys.ARTIST}
          />

          <GenericTextField
            fieldTitle={DURATION}
            errorsMasssege={
              methods.formState.errors[DialogKeys.DURATION]?.message
            }
            fieldName={DialogKeys.DURATION}
          />
        </div>
      </GenericDialog>
    </div>
  );
};

export default SongDialog;
