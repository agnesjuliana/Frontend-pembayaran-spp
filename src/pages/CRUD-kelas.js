import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {
    Card, Grid, Paper, Table, TableCell, TableContainer, TableHead,
    TableRow, TableBody, Typography, Button, Fab, Snackbar, Modal,
    Backdrop, Fade, TextField, MenuItem
} from "@material-ui/core"
import TabBar from './TabBar';

// URL
import { base_url, admin_image_url } from "../config"
import axios from "axios"

// ICON
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SaveIcon from '@material-ui/icons/Save';

import {useStyles} from './css'


export default function Crud() {

    // data from database
    const [data, setData] = useState([])

    useEffect(() => {
        getKelas()
    }, [])

    // Axios operation
    const getKelas = () => {
        let url = base_url + "/kelas"
        axios.get(url, headerConfig())
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const saveData = (event) => {
        handleModalClose()
        event.preventDefault()
        setModalEdit(false)

        let loadData = {
            nama_kelas: values.nama_kelas,
            kompetensi_keahlian: values.kompetensi_keahlian,
            id_kelas: values.id_kelas
        }
        let url = base_url + "/kelas"

        if (values.action === "add") {
            axios.post(url, loadData, headerConfig())
                .then(res => {
                    setSnackAlert(true)
                    getKelas()
                    setValues({ ...values, ["message"]: res.data.message })
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            axios.put(url, loadData, headerConfig())
                .then(res => {
                    setSnackAlert(true)
                    getKelas()
                    setValues({ ...values, ["message"]: res.data.message })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const deleteData = (selected) => {
        if (window.confirm("Apakah anda yakin akan menghapus data " + selected.nama_kelas + " ?")) {
            let url = base_url + "/kelas/" + selected.id_kelas
            axios.delete(url, headerConfig())
                .then(res => {
                    setValues({ ...values, ["message"]: res.data.message })
                    setSnackAlert(true)
                    getKelas()
                })
                .catch(err => console.log(err))
        }
    }

    const classes = useStyles()
    let user = JSON.parse(localStorage.getItem("user"))

    const [values, setValues] = React.useState({
        token: localStorage.getItem("token"),
        role: (localStorage.getItem("role")),
        name: user.nama_petugas,
        nama_kelas: "",
        kompetensi_keahlian: ""
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${values.token}` }
        }
        return header
    }

    // modal handling
    const [modalEdit, setModalEdit] = useState(false)

    const editTriger = (item) => {
        setModalEdit(true)
        setValues({
            ...values,
            ["nama_kelas"]: item.nama_kelas,
            ["kompetensi_keahlian"]: item.kompetensi_keahlian,
            ["id_kelas"]: item.id_kelas,
            ["action"]: "edit"
        })
    }

    const addTriger = () => {
        setValues({
            ...values,
            ["nama_kelas"]: "",
            ["kompetensi_keahlian"]: "",
            ["id_kelas"]: "",
        })
        setModalEdit(true)
        setValues({ ...values, ["action"]: "add" })
    }

    const handleModalClose = () => {
        setModalEdit(false)
        setValues({
            ...values,
            ["nama_kelas"]: "",
            ["kompetensi_keahlian"]: "",
            ["id_kelas"]: "",
            ["action"]: ""
        })
    }

    // array for modal
    const formModal = [
        { label: "Kelas", val: "nama_kelas", theValue: values.nama_kelas },
        { label: "Kompetensi Keahlian", val: "kompetensi_keahlian", theValue: values.kompetensi_keahlian },
    ]

    // snackbarHandling
    const [snackAlert, setSnackAlert] = useState(false)
    const handleSnackClose = () => {
        setSnackAlert(false)
    }

    if (values.role === "admin") {
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
                                            <b>Data Kelas</b>
                                        </Typography>
                                        <Typography variant="h3" className={classes.headerText}>
                                            SMK Neo Culture Technology
                                            </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container lg={4} alignItems="center" justify="center">
                                    <img src="https://drive.google.com/uc?id=1Xp7RaboqEodiDNXCdhZcHuiEoXjYHysS" />
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
                                                    <TableCell key="kelas" align="left" className={classes.columnKelas}>
                                                        NAMA KELAS
                                                    </TableCell>
                                                    <TableCell key="kompetensi" align="left" className={classes.columnKompetensi}>
                                                        KOMPETENSI
                                                    </TableCell>
                                                    <TableCell key="aksi" align="left" className={classes.columnAksi}>
                                                        AKSI
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {data.map(item => (
                                                    <TableRow hover>
                                                        <TableCell key="kelas" align="left" className={classes.columnKelas}>
                                                            {item.nama_kelas}
                                                        </TableCell>
                                                        <TableCell key="kompetensi" align="left" className={classes.columnKompetensi}>
                                                            {item.kompetensi_keahlian}
                                                        </TableCell>
                                                        <TableCell key="aksi" align="left" className={classes.columnAksi}>
                                                            {/* Button edit */}
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={() => editTriger(item)}
                                                                className={classes.button}
                                                                startIcon={<EditIcon />}
                                                            >
                                                                Edit
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
                            <AddCircleIcon /> Tambah Data Kelas
                        </Fab>
                    </Grid>
                    {/* Fixed footer end */}
                </Grid>



                {/* modal edit start*/}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={modalEdit}
                    onClose={handleModalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                >
                    <Fade in={modalEdit}>
                        <div className={classes.paperKelas}>
                            <Grid container justify="center" alignItems="center">
                                <Typography variant="h4">FORM KELAS</Typography>

                                {/* body card start */}
                                <Grid container justify="center" className={classes.formContainer}>

                                    {/* input form modal */}

                                    {/* general input */}
                                    {formModal.map(item => (
                                        <Grid container alignItems="center">
                                            <Grid item xs={4}>
                                                <Typography variant="h6"> {item.label} </Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={handleChange(item.val)}
                                                    value={item.theValue}
                                                    className={classes.inputField}>
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                    ))}
                                    {/* input form modal end */}

                                </Grid>
                            </Grid>
                            {/* body card end */}
                            <Grid container justify="center">
                                {/* button save */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={ev => saveData(ev)}
                                    className={classes.buttonSave}
                                    startIcon={<SaveIcon />}
                                >
                                    Save
                                    </Button>
                            </Grid>
                        </div>
                    </Fade>
                </Modal>
                {/* modal edit end */}


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