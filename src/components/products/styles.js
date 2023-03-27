import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: '#D6E4E5',
    padding:25,
  },
  root: {
    flexGrow: 1,
  },
}));