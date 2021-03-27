import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    // home start
    headerContainerHome: {
        minHeight: "100vh",
        
    },
    profileContainer: {
        minHeight: "70vh",
        background: "#7CFF6B",
        marginTop: "5vh",
        marginBottom: "5vh"
    },
    headerImg: {
        maxWidth: "90%",
    },
    profileImg: {
        maxWidth: "40vh",
        maxHeight: "40vh",
        margin: "10%",
    },
    profileCard: {
        minWidth: "55vw",
        minHeight: "50vh"
    },
    texth1: {
        fontSize: 50,
    },
    
    // login
    cardLogin: {
        minWidth: 320,
        minHeight: 350,
    },
    containerLogin: {
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #0A8270 20%, #7CFF6B 90%)',
    },
    buttonLogin: {
        background: '#0A8270',
        color: '#ffff',
        borderRadius: '30px',
        minWidth: 100
    },



    // header
    headerContainer: {
        minHeight: "50vh",

    },
    bodyContainer: {
        minHeight: "100vh",
        marginTop: "5vh",
        marginBottom: "5vh"
    },
    headerCard: {
        maxWidth: "95vw",
        minHeight: "40vh",
        minWidth: "95vw",
        background: 'linear-gradient(45deg, #7CFF6B 20%, #0A8270 90%)',
    },
    headerText: {
        color: "white"
    },

    // table (histori)
    tableBody: {
        maxWidth: "95vw",
    },

    // table spp
    columnId: {
        minWidth: "5vw",
        fontSize: "20px"
    },
    columnTahun: {
        minWidth: "25vw",
        fontSize: "20px"
    },
    columnNominal: {
        minWidth: "25vw",
        fontSize: "20px"
    },
    columnAksi: {
        minWidth: "5vw",
        fontSize: "20px"
    },

    // table kelas
    columnKelas: {
        minWidth: "15vw",
        fontSize: "20px"
    },
    columnKompetensi: {
        minWidth: "25vw",
        fontSize: "20px"
    },

    // card siswa
    bodyCardSiswa: {
        minHeight: "20vh",
        maxHeight: "60vh",
        maxWidth: "95vw",
        marginTop: "2vh",
    },
    bodyImgSiswa: {
        maxWidth: "15vh",
        maxHeight: "15vh",
        borderRadius: 100,
        margin: "2vh"
    },

    // card admin
    bodyCardAdmin: {
        marginTop: "5px",
        minHeight: "50vh",
        maxWidth: "95vw"
    },
    bodyImgAdmin: {
        maxHeight: "20vh",
        maxWidth: "20vh",
        borderRadius: 100,
        marginTop: "5vh"
    },

    // button
    button: {
        minWidth: "110px",
        margin: "5px"
    },
    buttonInfo: {
        minWidth: "110px",
        margin: "5px",
        backgroundColor: "#ffc107"
    },
    footerContainer: {
        position: "fixed",
        bottom: "3vh",
        right: "3vh",
    },
    footerButton: {
        backgroundColor: "#0A8270",
        '&:hover': {
            backgroundColor: "#7CFF6B",
        },
    },
    buttonAdd: {
        minHeight: "50vh",
        minWidth: "100%",
        backgroundColor: "#7CFF6B",
        fontSize: "20px",
        // background: "linear-gradient(45deg, #0A8270 20%, #7CFF6B 90%)",
        '&:hover': {
            backgroundColor: "#0A8270",
        },
    },


    // modal
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paperHistori: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: "30vw",
        minHeight: "40vh",
        maxWidth: "50vw",
    },
    paperSpp: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: "30vw",
        minHeight: "30vh",
        maxWidth: "50vw",
    },
    paperSiswa: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: "30vw",
        minHeight: "40vh",
        maxWidth: "50vw",
    },
    paperKelas: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: "30vw",
        minHeight: "30vh",
        maxWidth: "50vw",
    },
    paperAdmin: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: "30vw",
        minHeight: "50vh",
        maxWidth: "50vw",
    },
    inputField: {
        minWidth: "100%",
        margin: "5px"
    },
    formContainer: {
        margin: "2vh"
    },
    infoContainer: {
        marginLeft: "7vw"
    },
    buttonSave: {
        margin: "2vh",
        backgroundColor: "#0A8270",
        '&:hover': {
            backgroundColor: "#7CFF6B",
        },
        minWidth: "120px",
        minHeight: "2vh",
        fontSize: "18px",
        borderRadius: "100px"
    },
    inputNone: {
        display: 'none'
    },


}))

export {useStyles}