import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';
import { Container, Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import nf from "../../assets/unnamed.png"
import styles from "./PhotoList.module.css";

export default function PhotoList(props) {
    const { children } = props;
    //const current = props.photos?.photo.slice(indexOfFirst, indexOfLast);
    const current = props.photos?.photo;
    console.log("poto", current)

    const photo = props.photos?.photo.map((photo, i) => (
        <Grid item md={4} sm={6} xs={12} key={i} >
            <Card className={styles.card}>
                <CardActionArea>
                    <CardMedia
                        className={styles.cardMedia}
                        component="img"
                        image= {`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                        title= {photo.title}
                    />
                </CardActionArea>
            </Card>
        </Grid>
    ))

    return (
        <Grid container spacing={3} className={styles.container}>
            {children}
            {photo}
        </Grid>
    )
}
