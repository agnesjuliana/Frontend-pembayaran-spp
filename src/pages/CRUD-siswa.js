import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Card, Grid, Typography, Button, Fab, Snackbar, Modal, Backdrop, Fade, TextField, MenuItem } from "@material-ui/core"
import TabBar from './TabBar';


// URL
import { base_url, siswa_image_url } from "../config"
import axios from "axios"

// icon
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InfoIcon from '@material-ui/icons/Info';
import SaveIcon from '@material-ui/icons/Save';

import {useStyles} from './css'


export default function Crud() {

    // Data from database
    const [data, setData] = useState([]) //data siswa
    const [dataKelas, setDataKelas] = useState([]) //data kelas
    const [dataSpp, setDataSpp] = useState([]) //data spp

    // useEffect
    useEffect(() => {
        getSiswa()
        getSPP()
        getKelas()
    }, [])

    // Axios operation
    const getSiswa = () => {
        let url = base_url + "/siswa/for-" + values.role
        axios.get(url, headerConfig())
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getSPP = () => {
        let url = base_url + "/spp"
        axios.get(url, headerConfig())
            .then(res => {
                setDataSpp(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getKelas = () => {
        let url = base_url + "/kelas"
        axios.get(url, headerConfig())
            .then(res => {
                setDataKelas(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const saveData = (event) => {
        event.preventDefault()
        handleModalClose()
        let form = new FormData()
        form.append("nisn", values.nisn)
        form.append("nis", values.nis)
        form.append("nama", values.nama_siswa)
        form.append("id_kelas", values.id_kelas)
        form.append("alamat", values.alamat)
        form.append("no_telp", values.no_telp)
        form.append("id_spp", values.id_spp)
        form.append("username", values.username)
        form.append("password", values.password)

        if (values.image) {
            form.append("image", values.image)
        }

        let urlSave = base_url + "/siswa"
        if (values.action === "add") {
            axios.post(urlSave, form, headerConfig())
                .then(res => {
                    setValues({ ...values, ["message"]: res.data.message })
                    setSnackAlert(true)
                    getSiswa()
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            axios.put(urlSave, form, headerConfig())
                .then(res => {
                    setValues({ ...values, ["message"]: res.data.message })
                    setSnackAlert(true)
                    getSiswa()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const deleteData = (selected) => {
        if (window.confirm("Apakah anda yakin akan menghapus data " + selected.nama + " ?")) {
            let url = base_url + "/siswa/" + selected.nisn
            axios.delete(url, headerConfig())
                .then(res => {
                    setValues({ ...values, ["message"]: res.data.message })
                    setSnackAlert(true)
                    getSiswa()
                })
                .catch(err => console.log(err))
        }
    }

    // Make Style
    const classes = useStyles()

    // data from local storage
    let user = JSON.parse(localStorage.getItem("user"))
    const [values, setValues] = React.useState({
        token: localStorage.getItem("token"),
        role: (localStorage.getItem("role")),
        name: user.nama_petugas,
        nisn: "",
        nis: "",
        nama_siswa: "",
        id_kelas: 0,
        kelas: {},
        alamat: "",
        no_telp: "",
        id_spp: 0,
        spp: {},
        username: "",
        password: "",
        image: "",
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
    const [modalAdd, setModalAdd] = useState(false)
    const [modalInfo, setModalInfo] = useState(false)

    const editTriger = (item) => {
        setModalEdit(true)
        setValues({
            ...values,
            ["nisn"]: item.nisn,
            ["nis"]: item.nis,
            ["nama_siswa"]: item.nama,
            ["id_kelas"]: item.id_kelas,
            ["alamat"]: item.alamat,
            ["no_telp"]: item.no_telp,
            ["id_spp"]: item.id_spp,
            ["username"]: item.username,
            ["image"]: item.image,
        })
    }

    const addTriger = () => {
        setModalAdd(true)
        setValues({ ...values, ["action"]: "add" })
    }

    const infoTriger = (item) => {
        setModalInfo(true)
        setValues({
            ...values,
            ["nisn"]: item.nisn,
            ["nis"]: item.nis,
            ["nama_siswa"]: item.nama,
            ["kelas"]: item.kelas,
            ["alamat"]: item.alamat,
            ["no_telp"]: item.no_telp,
            ["spp"]: item.spp,
            ["username"]: item.username,
            ["image"]: item.image,
            ["action"]: "edit"
        })

    }

    const handleModalClose = () => {
        setModalEdit(false)
        setModalAdd(false)
        setModalInfo(false)
        setValues({
            ...values,
            ["nisn"]: "",
            ["nis"]: "",
            ["nama_siswa"]: "",
            ["id_kelas"]: "",
            ["alamat"]: "",
            ["no_telp"]: "",
            ["id_spp"]: "",
            ["username"]: "",
            ["image"]: "",
            ["action"]: ""
        })
    }

    // array for modal
    const formModal = [
        { label: "NISN", val: "nisn", theValue: values.nisn },
        { label: "NIS", val: "nis", theValue: values.nis },
        { label: "Nama", val: "nama_siswa", theValue: values.nama_siswa },
        { label: "Alamat", val: "alamat", theValue: values.alamat },
        { label: "No Telp", val: "no_telp", theValue: values.no_telp },
        { label: "Username", val: "username", theValue: values.username },
        { label: "Password", val: "password", theValue: values.password },
    ]

    const formModalInfo = [
        { label: "NISN", theValue: values.nisn },
        { label: "NIS", theValue: values.nis },
        { label: "Nama", theValue: values.nama_siswa },
        { label: "Kelas", theValue: values.kelas.nama_kelas },
        { label: "Alamat", theValue: values.alamat },
        { label: "No Telp", theValue: values.no_telp },
        { label: "SPP", theValue: values.spp.nominal },
        { label: "Username", theValue: values.username },
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
                <Grid container alignItems="center" justify="center">
                    {/* Header Start */}
                    <Grid container className={classes.headerContainer} alignItems="center" justify="center">
                        <Card className={classes.headerCard} elevation={10}>
                            <Grid container justify="center">
                                <Grid container lg={5} justify="center" alignItems="center">
                                    <Grid item>
                                        <Typography variant="h2" className={classes.headerText}>
                                            <b>Data Siswa</b>
                                        </Typography>
                                        <Typography variant="h3" className={classes.headerText}>
                                            SMK Neo Culture Technology
                                            </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container lg={4} alignItems="center" justify="center">
                                    <img src="https://drive.google.com/uc?id=1RCbwNVu5uYA514r93cnvz-NPjg5r3VMg" />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    {/* Header End */}

                    {/* Body start */}
                    <Grid container className={classes.bodyContainer} justify="center" >
                        {data.map(item => (
                            <Grid item xs={10} lg={8}>
                                <Card className={classes.bodyCardSiswa} elevation={5}>
                                    <Grid container alignItems="center">
                                        <Grid container lg={3} xs={12} justify="center">
                                            <img className={classes.bodyImgSiswa} src={siswa_image_url + "/" + item.image} />
                                        </Grid>
                                        <Grid container lg={4} justify="center">
                                            <Grid item>
                                                <Typography variant="h5"><b>{item.nama}</b></Typography>
                                                <Typography variant="h6"><b>NISN/NIS: </b>{item.nisn}/{item.nis}</Typography>
                                                <Typography variant="h6"><b>Kelas: </b>{item.kelas.nama_kelas}</Typography>
                                                <Typography variant="h6"><b>Status: </b>Masih dicoba</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container lg={5} xs={12} justify="center" alignItems="center">
                                            <Grid item lg={7}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => infoTriger(item)}
                                                    className={classes.buttonInfo}
                                                    startIcon={<InfoIcon />}
                                                >
                                                    Info
                                                </Button>
                                            </Grid>
                                            <Grid item lg={4}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => editTriger(item)}
                                                    className={classes.button}
                                                    startIcon={<EditIcon />}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => deleteData(item)}
                                                    className={classes.button}
                                                    startIcon={<DeleteIcon />}
                                                >
                                                    Hapus
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                    {/* Body end */}

                    {/* Fixed footer start */}
                    <Grid container justify="flex-end" className={classes.footerContainer}>
                        <Fab variant="extended" color="primary" aria-label="add" className={classes.footerButton} onClick={() => addTriger()}>
                            <AddCircleIcon /> Tambah Data Siswa
                        </Fab>
                    </Grid>
                    {/* Fixed footer end */}
                </Grid>





                {/* modal field start */}
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
                        <div className={classes.paperSiswa}>
                            <Grid container justify="center" alignItems="center">
                                <Typography variant="h4">FORM EDIT SISWA</Typography>

                                {/* body card start */}
                                <Grid container justify="center" className={classes.formContainer}>
                                    <Grid container justify="center" lg={4} xs={12}>
                                        <img className={classes.bodyImgSiswa} src={siswa_image_url + "/" + values.image} />
                                    </Grid>
                                    <Grid container justify="center" lg={7} xs={12} className={classes.formContainer}>

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

                                        {/* select kelas */}
                                        <Grid container alignItems="center">
                                            <Grid item xs={4}>
                                                <Typography variant="h6">Kelas</Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <TextField
                                                    select
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={handleChange("id_kelas")}
                                                    value={values.id_kelas}
                                                    className={classes.inputField}>
                                                    {dataKelas.map(itemMenu => (
                                                        <MenuItem key={itemMenu.id_kelas} value={itemMenu.id_kelas}>
                                                            {itemMenu.nama_kelas}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                        </Grid>

                                        {/* select spp */}
                                        <Grid container alignItems="center">
                                            <Grid item xs={4}>
                                                <Typography variant="h6">SPP</Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <TextField
                                                    select
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={handleChange("id_spp")}
                                                    value={values.id_spp}
                                                    className={classes.inputField}>
                                                    {dataSpp.map(itemMenu => (
                                                        <MenuItem key={itemMenu.id_spp} value={itemMenu.id_spp}>
                                                            {"Rp" + itemMenu.nominal}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                        </Grid>
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
                            </Grid>
                        </div>
                    </Fade>
                </Modal>
                {/* modal edit end */}













                {/* modal add start*/}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={modalAdd}
                    onClose={handleModalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                >
                    <Fade in={modalAdd}>
                        <div className={classes.paperSiswa}>
                            <Grid container justify="center" alignItems="center">
                                <Typography variant="h4">FORM TAMBAH ADMIN</Typography>

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

                                    {/* select kelas */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h6">Kelas</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                select
                                                variant="outlined"
                                                size="small"
                                                onChange={handleChange("id_kelas")}
                                                value={values.id_kelas}
                                                className={classes.inputField}>
                                                {dataKelas.map(itemMenu => (
                                                    <MenuItem key={itemMenu.id_kelas} value={itemMenu.id_kelas}>
                                                        {itemMenu.nama_kelas}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>

                                    {/* select spp */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h6">SPP</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                select
                                                variant="outlined"
                                                size="small"
                                                onChange={handleChange("id_spp")}
                                                value={values.id_spp}
                                                className={classes.inputField}>
                                                {dataSpp.map(itemMenu => (
                                                    <MenuItem key={itemMenu.id_spp} value={itemMenu.id_spp}>
                                                        {"Rp" + itemMenu.nominal}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    {/* input form modal end */}

                                    {/* upload */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h6">Image</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <input
                                                required
                                                accept="image/*"
                                                className={classes.inputField}
                                                // className={classes.inputNone}
                                                id="contained-button-file"
                                                type="file"
                                                onChange={event => setValues({ ...values, ["image"]: event.target.files[0] })}
                                            />
                                            {/* <label htmlFor="contained-button-file">
                                                <Button variant="contained" color="primary" component="span" className={classes.inputField}>
                                                    click to upload!
                                                </Button>
                                            </label> */}
                                        </Grid>
                                    </Grid>


                                </Grid>
                            </Grid>
                            {/* body card end */}

                            {/* button field */}
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
                            {/* button field end */}

                        </div>
                    </Fade>
                </Modal>
                {/* modal add end */}





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
                        <div className={classes.paperSiswa}>

                            {/* body card start */}
                            <Grid container justify="center" alignItems="center">
                                <Typography variant="h4">DETAIL SISWA</Typography>
                                <Grid container className={classes.formContainer} justify="center">
                                    <Grid container lg={3} justify="center" alignItems="center">
                                        <img className={classes.bodyImgSiswa} src={siswa_image_url + "/" + values.image} />
                                    </Grid>
                                    {/* info start */}
                                    <Grid container lg={8}>
                                        {formModalInfo.map(item => (
                                            <Grid container justify="flex-end">
                                                <Grid item lg={2}>
                                                    <Typography variant="h5">{item.label} </Typography>
                                                </Grid>
                                                <Grid container justify="center" lg={3}>:</Grid>
                                                <Grid item lg={6}>
                                                    <Typography variant="h6">{item.theValue}</Typography>
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Grid>
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