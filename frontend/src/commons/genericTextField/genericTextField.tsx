import React from 'react';
import { TextField, Typography } from '@mui/material';
import { Controller, FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister, UseFormReturn, useFormContext } from 'react-hook-form';

import useStyles from './genericTextFieldStyle';

interface Props {
    // currentInput: string;
    // setCurretnInput: React.Dispatch<React.SetStateAction<string>>;
    fieldTitle: string;
    fieldName: string;
    // methods: UseFormReturn<any, any, undefined>
    // register: UseFormRegister<FieldValues>;
    errorsMasssege: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
};

const GenericTextField: React.FC<Props> = ({
    // currentInput,
    // setCurretnInput,
    fieldTitle,
    fieldName,
    // methods,
    // register,
    errorsMasssege,
}) => {
    const classes = useStyles();
    // const {control} = useFormContext();

    return (
        <div className={classes.field}>
            <Typography className={classes.fieldTitle}>
                {fieldTitle}
            </Typography>

            <Controller
                name={fieldName}
                render={({ field }) => (
                    <TextField
                        className={classes.inputText}
                        variant='standard'
                        // value={currentInput}
                        // defaultValue={currentInput}
                        // {...register(fieldName)}
                        // onChange={(event) => { setCurretnInput(event.target.value) }}
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

