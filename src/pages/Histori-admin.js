import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {
    Card, Grid, Paper, Table, TableCell, TableContainer,
    TableHead, TableRow, TableBody, Typography, Button, Fab, Snackbar,
    Modal, Backdrop, Fade,
} from "@material-ui/core"
import TabBar from './TabBar';

// URL
import { base_url } from "../config"
import axios from "axios"

// ICON
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InfoIcon from '@material-ui/icons/Info';

import {useStyles} from './css'

export default function Histori() {

    // data from database
    const [data, setData] = useState([]) //histori


    // axios function
    useEffect(() => {
        getHistori()
    }, [])

    // Axios operation
    const getHistori = () => {
        let url = base_url + "/transaksi/for-" + values.role
        axios.get(url, headerConfig())
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }


    const deleteData = (selected) => {
        if (window.confirm("Apakah anda yakin akan menghapus data " + selected.id_pembayaran + " ?")) {
            let url = base_url + "/transaksi/for-" + values.role + "/" + selected.id_pembayaran
            axios.delete(url, headerConfig())
                .then(res => {
                    setValues({ ...values, ["message"]: res.data.message })
                    setSnackAlert(true)
                    getHistori()
                })
                .catch(err => console.log(err))
        }
    }

    // style
    const classes = useStyles()


    // data from local-storage
    let user = JSON.parse(localStorage.getItem("user"))
    const [values, setValues] = React.useState({
        token: localStorage.getItem("token"),
        role: (localStorage.getItem("role")),
        petugas: {},
        siswa: {},
        nisn: "",
        spp: {},
        bulan_dibayar: "",
        tahun_dibayar: "",
        jumlah_bayar: 0,
        message: "",
        id_pembayaran: 0,
        tgl_bayar: "",
        kelas: ""
    });


    const headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${values.token}` }
        }
        return header
    }

    // add data handling
    const addTriger = () => {
        window.location = "/" +values.role+ "/entri"
    }

    const [modalInfo, setModalInfo] = useState(false)
    const infoTriger = (item) => {
        setModalInfo(true)
        setValues({
            ...values,
            ["id_pembayaran"]: item.id_pembayaran,
            ["petugas"]: item.petugas,
            ["siswa"]: item.siswa,
            ["kelas"]: item.siswa.kelas,
            ["spp"]: item.siswa.spp,
            ["nisn"]: item.nisn,
            ["tgl_bayar"]: item.tgl_bayar,
            ["jumlah_bayar"]: item.jumlah_bayar,
            ["bulan_dibayar"]: item.bulan_dibayar,
            ["tahun_dibayar"]: item.tahun_dibayar,
        })

    }

    const handleModalClose = () => {
        setModalInfo(false)
    }


    // snackbarHandling
    const [snackAlert, setSnackAlert] = useState(false)
    const handleSnackClose = () => {
        setSnackAlert(false)
    }

    const formModalInfo = [
        { label: "ID Pembayaran", theValue: values.id_pembayaran },
        { label: "Nama Petugas", theValue: values.petugas.nama_petugas },
        { label: "Nama Siswa", theValue: values.siswa.nama },
        { label: "NISN", theValue: values.nisn },
        { label: "Kelas", theValue: values.kelas.nama_kelas },
        { label: "ID SPP", theValue: values.spp.id_spp },
        { label: "Taggal Bayar", theValue: values.tgl_bayar },
        { label: "Bulan Dibayar", theValue: values.bulan_dibayar },
        { label: "Tahun Dibayar", theValue: values.tahun_dibayar },
        { label: "Jumlah Nominal", theValue: values.jumlah_bayar },
    ]

    if (values.role === "admin" || values.role === "petugas") {
        return (
            <>
                <TabBar />
                <Grid container>
                    {/* Header Start */}
                    <Grid container className={classes.headerContainer} alignItems="center" justify="center">
                        <Card className={classes.headerCard} elevation={10}>
                            <Grid container justify="center">
                                <Grid container lg={5} justify="center" alignItems="center">
                                    <Grid item>
                                        <Typography variant="h2" className={classes.headerText}>
                                            <b>Histori <br /> Pembayaran</b>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container lg={4} alignItems="center" justify="center">
                                    <img src="https://drive.google.com/uc?id=1DY2MBJuiaWnyo43a-0xiqlAqc1Kykwau" />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    {/* Header End */}

                    {/* Body start */}
                    <Grid container className={classes.bodyContainer} justify="center">
                        <Grid container justify="center">
                            <Grid item lg={10}>
                                <Paper elevation={10}>
                                    <TableContainer className={classes.tableBody}>
                                        <Table stickyHeader >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell key="id_histori" align="left">
                                                        ID
                                                    </TableCell>
                                                    <TableCell key="siswa" align="left">
                                                        NAMA SISWA
                                                    </TableCell>
                                                    <TableCell key="petugas" align="left">
                                                        NAMA PETUGAS
                                                    </TableCell>
                                                    <TableCell key="tanggal" align="left">
                                                        TANGGAL BAYAR
                                                    </TableCell>
                                                    <TableCell key="bulan" align="left">
                                                        BULAN DIBAYAR
                                                    </TableCell>
                                                    <TableCell key="tahun" align="left">
                                                        TAHUN DIBAYAR
                                                    </TableCell>
                                                    <TableCell key="jumlah" align="left">
                                                        JUMLAH DIBAYAR
                                                    </TableCell>
                                                    <TableCell key="aksi" align="left">
                                                        AKSI
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {data.map(item => (
                                                    <TableRow hover>
                                                        <TableCell key="id_histori" align="left" className={classes.columnID}>
                                                            {item.id_pembayaran}
                                                        </TableCell>
                                                        <TableCell key="siswa" align="left" className={classes.columnNama}>
                                                            {item.siswa.nama}
                                                        </TableCell>
                                                        <TableCell key="petugas" align="left" className={classes.columnNama}>
                                                            {item.petugas.nama_petugas}
                                                        </TableCell>
                                                        <TableCell key="tanggal" align="left" className={classes.columnTanggal}>
                                                            {item.tgl_bayar}
                                                        </TableCell>
                                                        <TableCell key="bulan" align="left" className={classes.columnTanggal}>
                                                            {item.bulan_dibayar}
                                                        </TableCell>
                                                        <TableCell key="tahun" align="left" className={classes.columnTanggal}>
                                                            {item.tahun_dibayar}
                                                        </TableCell>
                                                        <TableCell key="jumlah" align="left" className={classes.columnJumlah}>
                                                            Rp {item.jumlah_bayar}
                                                        </TableCell>
                                                        <TableCell key="aksi" align="left" className={classes.columnAksi}>
                                                            {/* button info */}
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={() => infoTriger(item)}
                                                                className={classes.buttonInfo}
                                                                startIcon={<InfoIcon />}
                                                            >
                                                                Info
                                                            </Button>
                                                            {/* Button delete */}
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                onClick={() => deleteData(item)}
                                                                className={classes.button}
                                                                startIcon={<DeleteIcon />}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Body end */}

                    {/* Fixed footer start */}
                    <Grid container justify="flex-end" className={classes.footerContainer}>
                        <Fab variant="extended" color="primary" aria-label="add" className={classes.footerButton} onClick={() => addTriger()}>
                            <AddCircleIcon /> Entri Pembayaran
                        </Fab>
                    </Grid>
                    {/* Fixed footer end */}
                </Grid>

                {/* modal info start*/}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={modalInfo}
                    onClose={handleModalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                >
                    <Fade in={modalInfo}>
                        <div className={classes.paperHistori}>

                            {/* body card start */}
                            <Grid container justify="center" alignItems="center">
                                <Typography variant="h4">DETAIL PEMBAYARAN SPP</Typography>
                                <Grid container className={classes.formContainer} justify="center">
                                    {/* info start */}
                                    {formModalInfo.map(item => (
                                        <Grid container justify="flex-end" alignItems="center">
                                            <Grid item xs={3}>
                                                <Typography variant="h5">{item.label} </Typography>
                                            </Grid>
                                            <Grid container justify="center" xs={3}>:</Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="h6">{item.theValue}</Typography>
                                            </Grid>
                                        </Grid>
                                    ))}
                                    {/* info end */}
                                </Grid>
                            </Grid>
                            {/* body card end */}

                        </div>
                    </Fade>
                </Modal>
                {/* modal add end */}

                {/* snackbar */}
                <Snackbar
                    open={snackAlert}
                    autoHideDuration={6000}
                    onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity="success">
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