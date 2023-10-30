import React from 'react';
import { TextField, Typography } from '@mui/material';
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from 'react-hook-form';

import useStyles from './genericTextFieldStyle';

interface Props {
    currentInput: string;
    setCurretnInput: React.Dispatch<React.SetStateAction<string>>;
    fieldTitle: string;
    fieldName: string;
    register: UseFormRegister<FieldValues>;
    errorsMasssege: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
};

const GenericTextField: React.FC<Props> = ({
    currentInput,
    setCurretnInput,
    fieldTitle,
    fieldName,
    register,
    errorsMasssege,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.field}>
            <Typography className={classes.fieldTitle}>
                {fieldTitle}
            </Typography>

            <TextField
                className={classes.inputText}
                variant='standard'
                defaultValue={currentInput}
                {...register(fieldName)}
                onChange={(event) => { setCurretnInput(event.target.value) }}
                InputProps={{ disableUnderline: true }}
            >
            </TextField>

            <Typography className={classes.errorMassege}>
                {errorsMasssege}
            </Typography>
        </div>
    );
};

export default GenericTextField;

