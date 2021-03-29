import './App.css';

import {Switch, Route} from 'react-router-dom'

// File Page
import HomeSiswa from './pages/Home-siswa';
import HomePetugas from './pages/Home-petugas'
import HomeAdmin from './pages/Home-admin'
import HistoriSiswa from './pages/Histori-siswa';
import HistoriAdmin from './pages/Histori-admin';
import CRUDSiswa from './pages/CRUD-siswa';
import CRUDAdmin from './pages/CRUD-admin-petugas';
import CRUDKelas from './pages/CRUD-kelas';
import CRUDSpp from './pages/CRUD-spp';
import Login from './pages/Login';
import Entri from './pages/Entri';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/admin/entri" component={Entri}/>
        <Route exact path="/petugas/entri" component={Entri}/>
        <Route exact path="/siswa/home" component={HomeSiswa}/>
        <Route exact path="/petugas/home" component={HomePetugas}/>
        <Route exact path="/admin/home" component={HomeAdmin}/>
        <Route exact path="/siswa/histori" component={HistoriSiswa}/>
        <Route exact path="/admin/histori" component={HistoriAdmin}/>
        <Route exact path="/petugas/histori" component={HistoriAdmin}/>
        <Route exact path="/admin/crudsiswa" component={CRUDSiswa}/>
        <Route exact path="/admin/crudadmin" component={CRUDAdmin}/>
        <Route exact path="/admin/crudkelas" component={CRUDKelas}/>
        <Route exact path="/admin/crudspp" component={CRUDSpp}/>
      </Switch>
    </>
  );
}

export default App;
