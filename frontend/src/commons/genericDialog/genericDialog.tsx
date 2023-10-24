import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent } from '@mui/material';
import { FieldValues, FormProvider, UseFormHandleSubmit, UseFormReset, UseFormReturn } from 'react-hook-form';

import useStyles from './genericDialogStyle';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    submitText: string;
    dialogTitle: string;
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
    reset: UseFormReset<FieldValues>;
    // methods: UseFormReturn<FieldValues, any, undefined>
    children: JSX.Element;
    submitAction: () => void;
};

const GenericDialog: React.FC<Props> = ({
    open,
    setOpen,
    submitText,
    dialogTitle,
    submitAction,
    // methods,
    handleSubmit,
    reset,
    children
}) => {
    const classes = useStyles()

    const onSubmitHandler = () => {
        submitAction();
        closeDialog();
    };

    const closeDialog = () => {
        // methods.reset();
        reset();
        setOpen(false);
    };

    return (
        <div >
            <Dialog
                open={open}
                keepMounted
                onClose={closeDialog}
                aria-describedby="alert-dialog-new-song"
                className={classes.body}
            >
                <DialogTitle className={classes.title}>
                    {dialogTitle}
                </DialogTitle>

                {/* <FormProvider {...methods}> */}
                    <form
                        onSubmit={handleSubmit(onSubmitHandler)}
                        className={classes.content}
                    >
                        <DialogContent >
                            {children}
                        </DialogContent>

                        <DialogActions
                            className={classes.dialogAction}
                        >
                            <Button
                                type='submit'
                                onSubmit={submitAction}
                                className={classes.actionButton}
                            >
                                {submitText}
                            </Button>
                        </DialogActions>
                    </form>
                {/* </FormProvider> */}
            </Dialog>
        </div>
    );
};

export default GenericDialog;


