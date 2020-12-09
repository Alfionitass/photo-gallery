import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';
import { Container, Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import nf from "../../assets/unnamed.png"
import styles from "./PhotoList.module.css";

export default function PhotoList() {
    const [photos, setPhotos] = useState();

    useEffect(() => {
        axios({
            method: 'GET',
            url: "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=e8a7f5fd9748f2567214440d10611b4a&format=json&nojsoncallback=true",
        })
        .then(res => {
            if (res.status === 200) {
                //console.log("data", res)
                setPhotos(res?.data?.photos)
            }
        })
        .catch(err => {
            console.log("errornya", err)
        })
    }, [])

    return (
        <Grid container spacing={3} className={styles.container}>
            {photos?.photo.map((photo, i) => (
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
            ))}
        </Grid>
    )
}
