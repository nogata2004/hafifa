import React from 'react';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { Controller, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import useStyles from './genericAutocompleteStyle';


interface Props {
    fieldTitle: string;
    options: string[];
    isMulitple: boolean;
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
                    name={fieldName}
                    render={({ field }) => (
                        <Autocomplete
                            className={classes.autocomplete}
                            multiple={isMulitple}
                            options={options}
                            {...field}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    
                                />
                            }
                        />
                    )}
                />

                <Typography className={classes.errorMassege}>
                    {errorsMasssege}
                </Typography>
            </div>
        </div>
    );
};

export default GenericAutocomplete;

