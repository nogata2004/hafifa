import * as yup from 'yup';

const REQUIRED_ERROR = 'שדה הכרחי';
const TYPE_NAME_ERROR = 'שדה הכרחי מורכב מאותיות בלבד';

export const playlistDialogValidationSchema = yup.object({
    name: yup.string().matches(/^[a-z, א-ת]+$/, TYPE_NAME_ERROR).required(REQUIRED_ERROR),
    inputSongs: yup.array().of(yup.object()).min(0)
});
