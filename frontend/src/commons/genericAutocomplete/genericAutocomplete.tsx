import React, { useState } from 'react';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { Controller, FieldError, FieldErrors, FieldErrorsImpl, FieldValues, Merge, UseFormRegister, useFormContext } from 'react-hook-form';

import useStyles from './genericAutocompleteStyle';


interface Props {
    // setInput: React.Dispatch<React.SetStateAction<string[] | string | null>>;
    fieldTitle: string;
    options: string[];
    isMulitple: boolean;
    // register: UseFormRegister<FieldValues>;
    errorsMasssege: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    fieldName: string;
};


const GenericAutocomplete: React.FC<Props> = ({ fieldTitle, options, isMulitple, errorsMasssege, fieldName }) => {
    const classes = useStyles();

    return (
        <div >
            <div className={classes.field}>
                <Typography className={classes.fieldTitle}>
                    {fieldTitle}
                </Typography>

                <Controller
                    render={({ field }) => (
                        <Autocomplete
                            className={classes.autocomplete}
                            multiple={isMulitple}
                            // onChange={(event, value) => setInput(value)}
                            options={options}
                            // value={isMulitple === true ? options : null}
                            renderInput={(params) =>
                                <TextField
                                    // {...register(fieldName)}
                                    {...params}
                                />
                            }
                        />
                    )}
                    name={fieldName}
                    // control={control}
                />

                <Typography className={classes.errorMassege}>
                    {errorsMasssege}
                </Typography>
            </div>
        </div>
    );
};

export default GenericAutocomplete;

