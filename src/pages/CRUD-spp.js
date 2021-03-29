import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {
    Card, Grid, Paper, Table, TableCell, TableContainer,
    TableHead, TableRow, TableBody, Typography, Button, Fab,
    Snackbar, Modal, Backdrop, Fade, TextField, MenuItem
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
        getSpp()
    }, [])

    // Axios operation
    const getSpp = () => {
        let url = base_url + "/spp"
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
            tahun: values.tahun,
            nominal: values.nominal,
            id_spp: values.id_spp
        }
        let url = base_url + "/spp"

        if (values.action === "add") {
            axios.post(url, loadData, headerConfig())
                .then(res => {
                    setSnackAlert(true)
                    getSpp()
                    setValues({ ...values, ["message"]: res.data.message })
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            axios.put(url, loadData, headerConfig())
                .then(res => {
                    setSnackAlert(true)
                    getSpp()
                    setValues({ ...values, ["message"]: res.data.message })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const deleteData = (selected) => {
        if (window.confirm("Apakah anda yakin akan menghapus data " + selected.id_spp + " ?")) {
            let url = base_url + "/spp/" + selected.id_spp
            axios.delete(url, headerConfig())
                .then(res => {
                    setValues({ ...values, ["message"]: res.data.message })
                    setSnackAlert(true)
                    getSpp()
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
        tahun: "",
        nominal: 0,
        id_spp: 0,
        action: ""
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
            ["tahun"]: item.tahun,
            ["nominal"]: item.nominal,
            ["id_spp"]: item.id_spp,
            ["action"]: "edit"
        })
    }

    const addTriger = () => {
        setValues({
            ...values,
            ["tahun"]: "",
            ["nominal"]: "",
            ["id_spp"]: "",
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
        { label: "Tahun", val: "tahun", theValue: values.tahun },
        { label: "Nominal", val: "nominal", theValue: values.nominal },
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
                                            <b>Data SPP</b>
                                        </Typography>
                                        <Typography variant="h3" className={classes.headerText}>
                                            SMK Neo Culture Technology
                                            </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container lg={4} alignItems="center" justify="center">
                                    <img src="https://drive.google.com/uc?id=1BODaJTOoAYZmy7ux3H0ygJ8pAh3tR8_D" />
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
                                                    <TableCell key="idSPP" align="left" className={classes.columnId}>
                                                        ID
                                                    </TableCell>
                                                    <TableCell key="tahun" align="left" className={classes.columnTahun}>
                                                        TAHUN
                                                    </TableCell>
                                                    <TableCell key="nominal" align="left" className={classes.columnNominal}>
                                                        NOMINAL
                                                    </TableCell>
                                                    <TableCell key="aksi" align="left" className={classes.columnAksi}>
                                                        AKSI
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {data.map(item => (
                                                    <TableRow hover>
                                                        <TableCell key="idSPP" align="left" className={classes.columnId}>
                                                            {item.id_spp}
                                                        </TableCell>
                                                        <TableCell key="tahun" align="left" className={classes.columnTahun}>
                                                            {item.tahun}
                                                        </TableCell>
                                                        <TableCell key="nominal" align="left" className={classes.columnNominal}>
                                                            Rp {item.nominal}
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
                            <AddCircleIcon /> Tambah Data SPP
                        </Fab>
                    </Grid>
                    {/* Fixed footer end */}
                </Grid>




                {/* modal start*/}
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
                        <div className={classes.paperSpp}>
                            <Grid container justify="center" alignItems="center">
                                <Typography variant="h4">FORM SPP</Typography>

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
                {/* modal end */}


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