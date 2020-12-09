import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';
import { Container, Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import rs from "../../assets/rs.png"
import styles from "./PhotoList.module.css";

export default function PhotoList() {
    const [photos, setPhotos] = useState();

    useEffect(() => {
        fetchJsonp('https://api.flickr.com/services/feeds/photos_public.gne', {
            method: 'GET',
            mode: 'no-cors',
            credentials: 'include',
            jsonpCallback: 'photo_results'
        })
            .then(function (response) {
                return response.json()
            }).then(function (json) {
                console.log('data poto', json)
            }).catch(function (ex) {
                console.log('parsing failed', ex)
            })
    }, [])

    return (
        <Grid container spacing={5} className={styles.container}>
            <Grid item md={4} sm={6} xs={12} >
                <Card className={styles.card}>
                    <CardActionArea>
                        <CardMedia
                            className={styles.media}
                            component="img"
                            image={rs}
                            title="Hospital"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Malang Hospital
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item md={4} sm={6} xs={12} spacing={2}>
                <Card className={styles.card}>
                    <CardActionArea>
                        <CardMedia
                            className={styles.media}
                            component="img"
                            image={rs}
                            title="Hospital"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Malang Hospital
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item md={4} sm={6} xs={12} spacing={2}>
                <Card className={styles.card}>
                    <CardActionArea>
                        <CardMedia
                            className={styles.media}
                            component="img"
                            image={rs}
                            title="Hospital"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Malang Hospital
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item md={4} sm={6} xs={12} spacing={2}>
                <Card className={styles.card}>
                    <CardActionArea>
                        <CardMedia
                            className={styles.media}
                            component="img"
                            image={rs}
                            title="Hospital"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Malang Hospital
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

        </Grid>
    )
}
