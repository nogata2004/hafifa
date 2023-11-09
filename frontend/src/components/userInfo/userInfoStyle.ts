import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  body: {
    borderRadius: '10px',
    borderColor: 'rgb(250, 250, 250)',
    borderStyle: 'solid',
    borderWidth: '2px',
    display: 'flex',
    flexDirection: 'column',
    padding: '5px',
    height: 'fit-content', // check min-content - done:
    // https://nikolasbarwicki.com/articles/min-max-fit-content-width
  },

  helloUser: {
    '&.MuiTypography-root': {
      fontSize: '20px',
      textAlign: 'end',
    },
    color: 'rgb(250, 250, 250)',
  },

  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  logOut: {
    '&.MuiButton-text': {
      color: 'rgb(250, 250, 250)',
      fontSize: '15px',
      padding: '0 30px', // use shorthand variation '0 30px' - done
    },
    '&.MuiButton-root': {
      backgroundColor: 'rgb(130, 130, 124)',
      borderRadius: '15px',
    },
    '&.MuiButton-root:hover': {
      backgroundColor: 'rgb(130, 130, 124)',
    },
    width: 'fit-content',
    height: 'fit-content',
    display: 'flex',
  },
});
export default useStyles;
