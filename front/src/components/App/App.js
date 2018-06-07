import React, {Component} from 'react';
import './App.css';
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import {createMuiTheme} from "@material-ui/core/styles/index";
import Boleto from "../Purchase/Boleto/Boleto";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";
import GlobalLayout from "./GlobalLayout";


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
                    <Switch>
                        <Route exact path='/boleto' component={Boleto}/>
                        <Route component={GlobalLayout}/>
                    </Switch>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
