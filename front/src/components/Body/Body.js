import React, { Component } from 'react';
import Grid from "material-ui/es/Grid/Grid";
import Typography from "material-ui/es/Typography/Typography";
import Destaques from "../Destaques/Destaques"

class Body extends Component {
    render() {
        return (
            <Grid container xs={12} style={{marginTop: 75, padding: 20}}>
                <Grid item xs={12}>
                    <Destaques/>
                </Grid>
            </Grid>
        );
    }
}

export default Body;