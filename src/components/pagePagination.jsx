import React from "react";
import {Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import styles from "./PhotoList/PhotoList.module.css"

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

export default function PagePagination (props) {
    const classes = useStyles();
    const pageLinks = [];
    let page= [];
    const {pages, nextPage, currentPage, children } = props;

    for (let i=1; i <= pages + 1; i++) {
        let active = props.currentPage === i ? 'secondary' : '';

    pageLinks.push(<div className={`${active} `} key= {i} onClick={() => nextPage(i)}><a href="#">{i}</a></div>)
    page = [i];
    }

    return (
        <div className={classes.root}>
            <Pagination count={page} color="secondary" >
                {children}
                {pageLinks}
            </Pagination>
        </div>
        
    )
}