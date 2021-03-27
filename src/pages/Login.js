// GENERAL
import React from 'react';
import { FormControlLabel, Grid, RadioGroup, Radio, Card,TextField,
CardActions,CardContent,Button } from "@material-ui/core"

// ICON
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

// URL
import {base_url} from "../config"

// AXIOS
import axios from "axios"

// style
import {useStyles} from "./css"

export default function Login() {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        username: '',
        password: "",
        message: "",
        role: "admin",
        logged: false
    });

    const login = event => {
        let role = (values.role).toLowerCase()
        let checkData = {
            username: values.username,
            password: values.password
        }

        if (role === "siswa"){
            let url_siswa = base_url + "/siswa/login"
            axios.post(url_siswa, checkData)
            .then(response=>{
                setValues({...values,["logged"]:response.data.logged})
                if (values.logged){
                    setValues({...values,["role"]:response.data.role})
                    // console.log(values)
                    let user = response.data.data
                    let token = response.data.token
                    let role = response.data.role
                    localStorage.setItem("user", JSON.stringify(user))
                    localStorage.setItem("token", token)
                    localStorage.setItem("role", role)
                    window.location = "/siswa/home"
                }else {
                    console.log("belum masuk gais")
                }
            })
            .catch(error => console.log(error))
        }else{
            let url_admin_petugas = base_url + "/petugas/login"
            axios.post(url_admin_petugas, checkData)
            .then(response=>{
                setValues({...values,["logged"]:response.data.logged})
                if (values.logged){
                    setValues({...values,["role"]:response.data.data.role})
                    // console.log(values)
                    let user = response.data.data
                    let token = response.data.token
                    let fixRole = (response.data.data.level).toLowerCase()
                    localStorage.setItem("user", JSON.stringify(user))
                    localStorage.setItem("token", token)
                    localStorage.setItem("role", fixRole)

                    if(fixRole === "admin"){
                        window.location = "/admin/home"
                    }else{
                        window.location = "/petugas/home"
                    }
                }else {
                    console.log("belum masuk gais")
                }
            })
            .catch(error => console.log(error))
        }
        



    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values)
    };

    return (
        <Grid container className={classes.containerLogin} justify="center" alignItems="center" maxWidth="sm">
            <Card className={classes.cardLogin} variant="outlined" elevation={3} variant="elevation">
                    <CardContent>
                        <Grid container spacing={2} justify="center">
                            <Grid item>
                                <h1>LOGIN</h1>
                            </Grid>
                        </Grid>

                        {/* Username Field */}
                        <Grid container spacing={2} justify="center" alignItems="flex-end">
                            <Grid item>
                                <AccountCircle />
                            </Grid>
                            <Grid item>
                                <TextField fullWidth id="input-with-icon-grid"
                                    value={values.username}
                                    onChange={handleChange("username")}
                                    label="Username" />
                            </Grid>
                        </Grid>

                        {/* Pasword Field */}
                        <Grid container spacing={2} justify="center" alignItems="flex-end">
                            <Grid item>
                                <LockIcon />
                            </Grid>
                            <Grid item>
                                <TextField fullWidth id="input-with-icon-grid"
                                    label="Pasword"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange("password")}
                                    autoComplete="current-password" />
                            </Grid>
                        </Grid>
                    </CardContent>

                    <CardActions>
                        {/* Button field */}
                        <Grid container spacing={2}>
                            <Grid container justify="center">
                                <RadioGroup value={values.role} onChange={handleChange("role")}>
                                    <Grid container>
                                        <Grid item>
                                            <FormControlLabel value="admin" onClick={handleChange("role")} control={<Radio/>} label="Admin"/>
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel value="siswa" onClick={handleChange("role")} control={<Radio/>} label="Siswa"/>
                                        </Grid>
                                    </Grid>  
                                </RadioGroup>
                            </Grid>

                            <Grid container justify="center" alignItems="cemter">
                                <Button className={classes.buttonLogin} variant="contained" onClick={ev=>login(ev)}>Login</Button>
                            </Grid>
                        </Grid>
                    </CardActions>

            </Card>
        </Grid >
    );
}
