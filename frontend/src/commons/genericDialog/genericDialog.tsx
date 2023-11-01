import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent } from '@mui/material';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

import useStyles from './genericDialogStyle';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    submitText: string;
    dialogTitle: string;
    methods: UseFormReturn<any, any, undefined>
    children: JSX.Element;
    submitAction: (data: FieldValues) => void;
};

const GenericDialog: React.FC<Props> = ({
    open,
    setOpen,
    submitText,
    dialogTitle,
    submitAction,
    methods,
    children
}) => {
    const classes = useStyles()

    const closeDialog = () => {
        methods.reset();
        setOpen(false);
    };

    return (
        <div >
            <Dialog
                open={open}
                keepMounted
                onClose={closeDialog}
                className={classes.body}
            >
                <DialogTitle className={classes.title}>
                    {dialogTitle}
                </DialogTitle>

                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(submitAction)}
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
                                className={classes.actionButton}
                            >
                                {submitText}
                            </Button>
                        </DialogActions>
                    </form>
                </FormProvider>
            </Dialog>
        </div>
    );
};

export default GenericDialog;


