import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import { AppBar, Tab, Tabs } from '@material-ui/core';

export default class TabBar extends React.Component {
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("role")
        window.location = "/"
    }

    constructor() {
        super()
        this.state = {
            routes: [
                "/home",
                "/histori",
                "/entri",
                "/crudsiswa",
                "/crudadmin",
                "/crudkelas",
                "/crudspp"
            ],
            token: "",
            role: ""

        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
            this.state.role = localStorage.getItem("role")
        } else {
            window.location = "/"
        }
    }

    TabRole = (prop) => {
        let role = prop.toLowerCase()
        if (role === "siswa") {
            return (
                <Route
                    path="/siswa"
                    render={(history) => (
                        <AppBar position="sticky" color="transparent">
                            <Tabs centered value={history.location.pathname}>
                                <Tab
                                    label="home"
                                    value={"/siswa" + this.state.routes[0]}
                                    component={Link}
                                    to={"/siswa" + this.state.routes[0]}
                                />
                                <Tab
                                    label="histori"
                                    value={"/siswa" + this.state.routes[1]}
                                    component={Link}
                                    to={"/siswa" + this.state.routes[1]}
                                />
                                <Tab
                                    onClick={() => this.Logout()}
                                    label="logout"
                                />
                            </Tabs>
                        </AppBar>
                    )}
                />
            )
        } else if (role === "petugas") {
            return (
                <Route
                    path="/petugas"
                    render={(history) => (
                        <AppBar position="sticky" color="transparent">
                            <Tabs centered value={history.location.pathname}>
                                <Tab
                                    label="home"
                                    value={"/petugas" + this.state.routes[0]}
                                    component={Link}
                                    to={"/petugas" + this.state.routes[0]}
                                />
                                <Tab
                                    label="entri"
                                    value={"/petugas" + this.state.routes[2]}
                                    component={Link}
                                    to={"/petugas" + this.state.routes[2]}
                                />
                                <Tab
                                    label="histori"
                                    value={"/petugas" + this.state.routes[1]}
                                    component={Link}
                                    to={"/petugas" + this.state.routes[1]}
                                />
                                <Tab
                                    onClick={() => this.Logout()}
                                    label="logout"
                                />
                            </Tabs>
                        </AppBar>
                    )}
                />
            )
        } else if (role === "admin") {
            return (
                <Route
                    path="/admin"
                    render={(history) => (
                        <AppBar position="sticky" color="transparent">
                            <Tabs centered value={history.location.pathname}>
                                <Tab
                                    label="home"
                                    value={"/admin" + this.state.routes[0]}
                                    component={Link}
                                    to={"/admin" + this.state.routes[0]}
                                />
                                <Tab
                                    label="entri"
                                    value={"/admin" + this.state.routes[2]}
                                    component={Link}
                                    to={"/admin" + this.state.routes[2]}
                                />
                                <Tab
                                    label="histori"
                                    value={"/admin" + this.state.routes[1]}
                                    component={Link}
                                    to={"/admin" + this.state.routes[1]}
                                />
                                <Tab
                                    label="data siswa"
                                    value={"/admin" + this.state.routes[3]}
                                    component={Link}
                                    to={"/admin" + this.state.routes[3]}
                                />
                                <Tab
                                    label="data admin"
                                    value={"/admin" + this.state.routes[4]}
                                    component={Link}
                                    to={"/admin" + this.state.routes[4]}
                                />
                                <Tab
                                    label="data kelas"
                                    value={"/admin" + this.state.routes[5]}
                                    component={Link}
                                    to={"/admin" + this.state.routes[5]}
                                />
                                <Tab
                                    label="data spp"
                                    value={"/admin" + this.state.routes[6]}
                                    component={Link}
                                    to={"/admin" + this.state.routes[6]}
                                />
                                <Tab
                                    onClick={() => this.Logout()}
                                    label="logout"
                                />
                            </Tabs>
                        </AppBar>
                    )}
                />
            )
        } else {
            window.location = "/"
        }
    }

    render() {
        return (
            <>
                {this.TabRole(this.state.role)}
            </>
        )
    }
}