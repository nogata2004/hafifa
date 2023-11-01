import React from 'react';
import { TextField, Typography } from '@mui/material';
import { Controller, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import useStyles from './genericTextFieldStyle';


interface Props {
    fieldTitle: string;
    fieldName: string;
    errorsMasssege: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
};

const GenericTextField: React.FC<Props> = ({ fieldTitle, fieldName, errorsMasssege }) => {
    const classes = useStyles();

    return (
        <div className={classes.field}>
            <Typography className={classes.fieldTitle}>
                {fieldTitle}
            </Typography>

            <Controller
                name={fieldName}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className={classes.inputText}
                        variant='standard'
                        InputProps={{ disableUnderline: true }}
                    />
                )}
            />

            <Typography className={classes.errorMassege}>
                {errorsMasssege}
            </Typography>
        </div>
    );
};

export default GenericTextField;

