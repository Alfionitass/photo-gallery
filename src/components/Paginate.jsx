import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
        display: 'flex',
        justifyContent: 'center'
    },
}));

export default function Paginate({ totalPages }) {
    const classes = useStyles();
    let numPage = 0;
    let foo = Array.from(Array(totalPages).keys())

    const pages = foo.map((value, index) => (
        <Pagination color="secondary" key={index} >
            {index+1}
        </Pagination>
    ))

    return (
        <div className={classes.root}>
            { pages }
        </div>
    )
}