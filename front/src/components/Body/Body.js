import React, {Component} from 'react';
import Grid from "material-ui/es/Grid/Grid";
import {Route, Switch} from 'react-router-dom'
import Destaques from "../Destaques/Destaques";
<<<<<<< HEAD
import FiltroCategoria from "../FiltroCategoria/FiltroCategoria";
import Carrinho from "../Carrinho/Carrinho";
import Typography from "material-ui/es/Typography/Typography";
=======
import FiltroCategoria from "../FiltroCategoria/Filtro";
>>>>>>> 46d493b4060dd77a7d1be3612959f62acf6662be
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
                    <Route path='/carrinho' component={Carrinho}/>
                </Switch>
                </Grid>
            </Grid>
        );
    }
}

export default Body;