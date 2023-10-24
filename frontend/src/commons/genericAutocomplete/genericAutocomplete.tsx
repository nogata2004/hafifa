import React, { useState } from 'react';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { FieldError, FieldErrors, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from 'react-hook-form';

import useStyles from './genericAutocompleteStyle';


interface Props {
    // setListInput?: React.Dispatch<React.SetStateAction<string[]>>;
    setInput: React.Dispatch<React.SetStateAction<string[] | string | null>>;
    fieldTitle: string;
    options: string[];
    isMulitple: boolean;
    register: UseFormRegister<FieldValues>;
    errorsMasssege: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    fieldName: string;
};


const GenericAutocomplete: React.FC<Props> = ({ setInput, fieldTitle, options, isMulitple, register, errorsMasssege, fieldName }) => {
    const classes = useStyles();

    return (
        <div >
            <div className={classes.field}>
                <Typography className={classes.fieldTitle}>
                    {fieldTitle}
                </Typography>

                <Autocomplete
                    className={classes.autocomplete}
                    // disablePortal
                    multiple={isMulitple}
                    onChange={(event, value) => setInput(value)}
                    options={options}
                    renderInput={(params) =>
                        <TextField
                            {...register(fieldName)}
                            {...params}
                        />
                    }
                />

                <Typography className={classes.errorMassege}>
                    {errorsMasssege}
                </Typography>
            </div>
        </div>
    );
};

export default GenericAutocomplete;

