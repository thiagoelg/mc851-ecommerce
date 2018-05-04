import React, {Component} from 'react';
import './App.css';
import Body from '../Body/Body';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Destaques from '../Destaques/Destaques'
import {Grid} from "material-ui";
import MuiThemeProvider from "material-ui/es/styles/MuiThemeProvider";
import {createMuiTheme} from "material-ui/styles/index";

class App extends Component {
    render() {
        const theme = createMuiTheme({
            palette: {
                primary: {
                    light: '#534bae',
                    main: '#1a237e',
                    dark: '#000051',
                    contrastText: '#fff',
                },
                secondary: {
                    light: '#a4a4a4',
                    main: '#757575',
                    dark: '#494949',
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
