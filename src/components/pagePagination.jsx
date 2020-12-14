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

const pagePagination = (props) => {
    const classes = useStyles();
    const pageLinks = [];
    const {pages, nextPage, currentPage, children } = props;

    for (let i=1; i <= pages + 1; i++) {
        let active = props.currentPage === i ? 'secondary' : '';

    pageLinks.push(<div className={`${active} `} key= {i} onClick={() => nextPage(i)}><a href="#">{i}</a></div>)
    }

    return (
        <div className={classes.root}>
            <Pagination count={pageLinks} >
                {children}
                
            </Pagination>
        </div>
        
    )
}

export default pagePagination;