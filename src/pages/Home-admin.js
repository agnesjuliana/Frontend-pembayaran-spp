import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Typography } from "@material-ui/core"
import TabBar from './TabBar';
import {useStyles} from './css'

// URL
import { base_url, admin_image_url } from "../config"


export default function HomeAdmin() {
    const classes = useStyles()
    let user = JSON.parse(localStorage.getItem("user"))

    const [values, setValues] = React.useState({
        token: localStorage.getItem("token"),
        role: (localStorage.getItem("role")),
        name: user.nama_petugas,
    });

    const headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${values.token}` }
        }
        return header
    }

    if (values.role === "admin") {
        return (
            <>
                <TabBar />
                <Grid container direction="row">
                    {/* header start */}
                    <Grid container
                        className={classes.headerContainerHome} >
                        <Grid container xs={12} lg={6} alignItems="center" justify="center">
                            <Grid items>
                                <Typography variant="h1" align="center">
                                    Halo Admin
                                </Typography>
                                <Typography variant="h3" align="center">
                                    {values.name}
                                </Typography>
                                <Typography variant="h4" align="center">
                                    Website Pembayaran SPP <br /> SMK Neo Culture Technology
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container xs={12} lg={6} alignItems="center" justify="center">
                            <img className={classes.headerImg} src="https://drive.google.com/uc?id=1D_EmdmQdGVQWHJORW81yjIuWd9NGQvNk" />
                        </Grid>
                    </Grid>
                    {/* header end */}

                    {/* body start */}
                    <Grid container className={classes.profileContainer} alignItems="center" justify="center">
                        <Card className={classes.profileCard} elevation={24}>
                            <Grid container>
                                <Grid container lg={6} alignItems="center" justify="center">
                                    <img className={classes.profileImg} src={admin_image_url + "/" + user.image} />
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