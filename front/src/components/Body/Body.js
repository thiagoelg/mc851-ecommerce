import React, { Component } from 'react';
import Grid from "material-ui/es/Grid/Grid";
import { Switch, Route } from 'react-router-dom'
import Destaques from "../Destaques/Destaques";
import FiltroCategoria from "../FiltroCategoria/FiltroCategoria";
import Typography from "material-ui/es/Typography/Typography";


// Para <FiltroCategoria /> dentro do grid, tirar o style do grid:
// style={{paddingLeft: '10%', paddingRight: '10%'}}
// e mudar o marginTop e padding do grid pai para style={{marginTop: 100, padding: 10}}

class Body extends Component {
    render() {
        return (
            <Grid container xs={12} style={{marginTop: 130, padding: 20}}>
                <Switch>
                    <Route exact path='/' render={() => 
                        <Grid item xs={12} justify='center' style={{paddingLeft: '10%', paddingRight: '10%'}}>
                            <Destaques />
                        </Grid>
                    } />
                    <Route exact path='/categorias' component={FiltroCategoria}/>
                </Switch>
            </Grid>
        );
    }
}

export default Body;