import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({

    root:{
        maxWidth:'100%',
    },
    media: {
        height: 10,
        paddingTop: '56.25%',
    },
    cardAction: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));