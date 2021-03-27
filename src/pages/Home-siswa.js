import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Typography } from "@material-ui/core"
import TabBar from './TabBar';
import {useStyles} from './css'

// URL
import { siswa_image_url } from "../config"

export default function HomeSiswa() {
    const classes = useStyles()

    let user = JSON.parse(localStorage.getItem("user"))

    const [values, setValues] = React.useState({
        token: localStorage.getItem("token"),
        role: (localStorage.getItem("role")),
        name: user.nama,
        username: user.username
    });

    if (values.role === "siswa") {
        return (
            <>
                <TabBar />
                <Grid container>
                    {/* header start */}
                    <Grid container
                        className={classes.headerContainerHome} spacing={2} >
                        <Grid container xs={12} lg={6} alignItems="center" justify="center">
                            <Grid items>
                                <Typography variant="h1" align="center">
                                    Pembayaran SPP
                                </Typography>
                                <Typography variant="h2" align="center">
                                    SMK Neo Culture Technology
                                </Typography>
                                <Typography variant="h3" align="center">
                                    Selamat Datang User!
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container xs={12} lg={6} alignItems="center" justify="center">
                            <img className={classes.headerImg} src="https://drive.google.com/uc?id=1knPg50tcEJ1oN6gOctowuYu2mBAxRdy9" />
                        </Grid>
                    </Grid>
                    {/* header end */}


                    {/* body start */}
                    <Grid container className={classes.profileContainer} alignItems="center" justify="center">
                        <Card className={classes.profileCard} elevation={24}>
                            <Grid container>
                                <Grid container lg={6} alignItems="center" justify="center">
                                    <img className={classes.profileImg} src={siswa_image_url + "/" + user.image} />
                                </Grid>
                                <Grid container lg={4} alignItems="center" justify="center">
                                    <Grid item>
                                        <Typography variant="h2"><b>{values.name}</b></Typography>
                                        <Typography variant="h4">username <b>{user.username}</b></Typography>
                                        <Typography variant="h4">Role<b> {values.role}</b></Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                    {/* body end */}
                </Grid>
            </>
        )
    } else {
        window.location = "/"
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("role")
        window.location = "/"
    }


}