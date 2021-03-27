import React, { useEffect, useState } from 'react'
import TabBar from './TabBar'
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Typography, Button, TextField, MenuItem, Snackbar } from "@material-ui/core"
import { base_url } from '../config';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert'

// icon
import SaveIcon from '@material-ui/icons/Save';


export default function Histori() {
    // data from database
    const [siswa, setSiswa] = useState()

    // useEffect(() => {
    //     getSiswa()
    // }, [])



    // axios function
    const getSiswa = (prop) => (event) => {
        let url = base_url + "/siswa/for-" + values.role + "/" + prop + "/" + event.target.value
        axios.get(url, headerConfig())
            .then(res => {
                setSiswa(res.data)
                setValues({ ...values, ["nisn"]: res.data.nisn })
                setValues({ ...values, ["nama_siswa"]: res.data.nama })
                setValues({ ...values, ["id_spp"]: res.data.id_spp })
                setValues({ ...values, ["jumlah_bayar"]: res.data.spp.nominal })
            })
            .catch(err => {
                console.log(err)
            })
    }

    const postPembayaran = (event) => {
        event.preventDefault()

        let loadData = {
            id_petugas: values.id_petugas,
            nisn: siswa.nisn,
            tgl_bayar: new Date().toISOString().split('T')[0],
            bulan_dibayar: values.bulan_dibayar,
            tahun_dibayar: values.tahun_dibayar,
            id_spp: siswa.id_spp,
            jumlah_bayar: values.jumlah_bayar
        }
        let url = base_url + "/transaksi/for-" + values.role
        axios.post(url, loadData, headerConfig())
            .then(res => {
                setSnackAlert(true)
                setValues({ ...values, ["message"]: res.data.message })
            })
            .catch(err => {
                console.log(err)
            })
    }



    // style
    const useStyles = makeStyles({
        mainContainer: {
            minWidth: "100vw",
            minHeight: "94vh",
            background: 'linear-gradient(45deg, #0A8270 20%, #7CFF6B 90%)',
        },
        cardContainer: {
            minWidth: "50vw",
            minHeight: "70vh",
            maxWidth: "70vw",
            padding: "2vh"
        },
        inputField: {
            minWidth: "100%",
            margin: "5px"
        },
        formContainer: {
            margin: "2vh"
        },
        button: {
            margin: "2vh",
            backgroundColor: "#0A8270",
            '&:hover': {
                backgroundColor: "#7CFF6B",
            },
            minWidth: "100px",
            minHeight: "2vh",
            fontSize: "18px"
        }

    })
    const classes = useStyles()

    // data from local storage and user input
    let user = JSON.parse(localStorage.getItem("user"))
    const [values, setValues] = React.useState({
        token: localStorage.getItem("token"),
        role: (localStorage.getItem("role")),
        nama_petugas: user.nama_petugas,
        id_petugas: user.id_petugas,
        nama_siswa: null,
        nisn: null,
        id_spp: null,
        bulan_dibayar: "Januari",
        tahun_dibayar: "2021",
        jumlah_bayar: 0,
        message: ""
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values)
    };


    // header config for database access
    const headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${values.token}` }
        }
        return header
    }


    // bulan and tahun picker
    const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
    const tahun = ["2019", "2020", "2021", "2022"]

    // snackbar handling
    const [snackAlert, setSnackAlert] = useState(false)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackAlert(false);
    };

    if (values.role === "admin" || values.role === "petugas") {
        return (
            <>
                <TabBar />
                <Grid container className={classes.mainContainer} justify="center" alignItems="center">
                    <Grid item>
                        <Card className={classes.cardContainer} elevation={10}>
                            <Grid container justify="center">
                                <Typography variant="h4">Pembayaran SPP</Typography>
                                <Grid container className={classes.formContainer}>
                                    {/* Petugas */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h6">Petugas</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField disabled
                                                variant="outlined"
                                                size="small"
                                                value={values.nama_petugas}
                                                className={classes.inputField} />
                                        </Grid>
                                    </Grid>

                                    {/* NISN */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h6">NISN</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                                value={values.nisn}
                                                onChange={getSiswa("nisn")}
                                                className={classes.inputField} />
                                        </Grid>
                                    </Grid>

                                    {/* NAMA SISWA */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h6">Nama Siswa</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                                value={values.nama_siswa}
                                                onChange={getSiswa("nama")}
                                                className={classes.inputField} />
                                        </Grid>
                                    </Grid>

                                    {/* Tanggal Bayar */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h6">Tanggal Bayar</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField disabled
                                                variant="outlined"
                                                size="small"
                                                value={new Date().toISOString().split('T')[0]}
                                                className={classes.inputField} />
                                        </Grid>
                                    </Grid>

                                    {/* Bulan DIbayar */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h6">Bulan Dibayar</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField select
                                                variant="outlined"
                                                size="small"
                                                value={values.bulan_dibayar}
                                                onChange={handleChange("bulan_dibayar")}
                                                className={classes.inputField}>
                                                {bulan.map(item => (
                                                    <MenuItem key={item} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>

                                    {/* Tahun Dibayar */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h6">Tahun Dibayar</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField select
                                                variant="outlined"
                                                size="small"
                                                value={values.tahun_dibayar}
                                                onChange={handleChange("tahun_dibayar")}
                                                className={classes.inputField}>
                                                {tahun.map(item => (
                                                    <MenuItem key={item} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>

                                    {/* ID SPP */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h6">ID SPP</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField disabled
                                                variant="outlined"
                                                size="small"
                                                value={values.id_spp}
                                                className={classes.inputField} />
                                        </Grid>
                                    </Grid>

                                    {/* Jumlah Bayar */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h6">Jumlah Bayar</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField disabled
                                                variant="outlined"
                                                value={values.jumlah_bayar}
                                                className={classes.inputField} />
                                        </Grid>
                                    </Grid>
                                    <Grid container justify="flex-end" >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={ev => postPembayaran(ev)}
                                            className={classes.button}
                                            startIcon={<SaveIcon />}
                                        >
                                            Save
                                        </Button>
                                    </Grid>


                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
                <Snackbar
                    open={snackAlert}
                    autoHideDuration={6000}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        {values.message}
                    </Alert>
                </Snackbar>
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