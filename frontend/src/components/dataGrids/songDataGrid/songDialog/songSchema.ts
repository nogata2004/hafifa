import * as yup from 'yup';

const REQUIRED_ERROR = 'שדה הכרחי';
const TYPE_NAME_ERROR = 'שדה הכרחי מורכב מאותיות בלבד';
const TYPE_DURATION_ERROR = 'שדה הכרחי חייב להיות בפורמט: mm:ss';

export const songDialogValidationSchema = yup.object({
    name: yup.string().matches(/^[a-z, א-ת]+$/, TYPE_NAME_ERROR).required(REQUIRED_ERROR),
    artist: yup.object().required(REQUIRED_ERROR),
    duration: yup.string().matches(/[0-5][0-9]:[0-5][0-9]/, TYPE_DURATION_ERROR)
        .required(REQUIRED_ERROR)
        .max(5, TYPE_DURATION_ERROR)
});