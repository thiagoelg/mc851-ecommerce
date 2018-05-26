import React, {Component} from 'react';
import './App.css';
import Body from '../Body/Body';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {Grid} from "@material-ui/core";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import {createMuiTheme} from "@material-ui/core/styles/index";


class App extends Component {
    render() {
        const theme = createMuiTheme({
            palette: {
                primary: {
                    light: '#5f5fc4',
                    main: '#283593',
                    dark: '#001064',
                    contrastText: '#fff',
                },
                secondary: {
                    light: '#ff4081',
                    main: '#ff4081',
                    dark: '#ff4081',
                    contrastText: '#fff',
                },

            },
        });

        return (
            <MuiThemeProvider theme={theme}>
                <div style={{padding: 20}}>
                    <Grid container spacing={24}>
                        <Header/>
                    </Grid>
                    <Grid container spacing={24}>
                        <Body/>
                    </Grid>
                    <Grid container spacing={24}>
                        <Footer/>
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
