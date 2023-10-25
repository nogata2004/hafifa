import React from 'react';
import { TextField, Typography } from '@mui/material';
import { Controller, FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from 'react-hook-form';

import useStyles from './genericTextFieldStyle';

interface Props {
    currentInput: string;
    setCurretnInput: React.Dispatch<React.SetStateAction<string>>;
    fieldTitle: string;
<<<<<<< HEAD
=======
    register: UseFormRegister<FieldValues>;
    errorsMasssege: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
>>>>>>> 93e183b1cfafe6dade446b93f76a7c01d7f22dd6
    fieldName: string;
};

const GenericTextField: React.FC<Props> = ({
    currentInput,
    setCurretnInput,
    fieldTitle,
<<<<<<< HEAD
=======
    register,
    errorsMasssege,
>>>>>>> 93e183b1cfafe6dade446b93f76a7c01d7f22dd6
    fieldName
}) => {
    const classes = useStyles();

    return (
        <div className={classes.field}>
            <Typography className={classes.fieldTitle}>
                {fieldTitle}
            </Typography>

<<<<<<< HEAD
            <TextField
                name={fieldName}
                className={classes.inputText}
                variant='standard'
                defaultValue={currentInput}
                onChange={(event) => { setCurretnInput(event.target.value) }}
                InputProps={{ disableUnderline: true }}
            >
            </TextField>
=======
            {/* <Controller
                render={{ field }}
            > */}
            {/* <Controller name={'d'} render={(params) => ( */}
                <TextField
                    // {...field}
                    // error={params.fieldState.}                  
                    // name={fieldName}
                    className={classes.inputText}
                    variant='standard'
                    defaultValue={currentInput}
                    {...register(fieldName)}
                    onChange={(event) => { setCurretnInput(event.target.value) }}
                    InputProps={{ disableUnderline: true }}
                >
                </TextField>
            {/* )} /> */}
>>>>>>> 93e183b1cfafe6dade446b93f76a7c01d7f22dd6

            <Typography className={classes.errorMassege}>
                {errorsMasssege}
            </Typography>
        </div>
    );
};

export default GenericTextField;

