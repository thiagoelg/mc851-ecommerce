import React, {Component} from 'react';
import Grid from "material-ui/es/Grid/Grid";
import {Route, Switch} from 'react-router-dom'
import Destaques from "../Destaques/Destaques";
import FiltroCategoria from "../FiltroCategoria/Filtro";
import Product from "../Products/Product";


// Para <FiltroCategoria /> dentro do grid, tirar o style do grid:
// style={{paddingLeft: '10%', paddingRight: '10%'}}
// e mudar o marginTop e padding do grid pai para style={{marginTop: 100, padding: 10}}

class Body extends Component {
    render() {
        return (
            <Grid container xs={12} style={{marginTop: 130, padding: 20}}>
                <Grid item xs={12} justify='center' style={{paddingLeft: '10%', paddingRight: '10%'}}>
                <Switch>
                    <Route exact path='/' component={Destaques}/>
                    <Route exact path='/categorias' component={FiltroCategoria}/>
                    <Route path='/products/:id' component={Product}/>
                    <Route path='/categorias/:id' component={FiltroCategoria}/>
                </Switch>
                </Grid>
            </Grid>
        );
    }
}

export default Body;