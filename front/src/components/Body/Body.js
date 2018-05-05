import React, { Component } from 'react';
import Grid from "material-ui/es/Grid/Grid";
import Destaques from "../Destaques/Destaques";
import Typography from "material-ui/es/Typography/Typography";

class Body extends Component {
    render() {
        return (
            <Grid container xs={12} style={{marginTop: 150, padding: 20}}>
                <Grid item xs={12} justify='center' style={{paddingLeft: '10%', paddingRight: '10%'}}>
                    <Destaques />
                </Grid>
            </Grid>
        );
    }
}

export default Body;