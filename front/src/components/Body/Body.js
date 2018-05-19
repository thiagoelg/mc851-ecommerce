import React, {Component} from 'react';
import Grid from "material-ui/es/Grid/Grid";
import {Route, Switch} from 'react-router-dom'
import Destaques from "../Produtos/Destaques";
import ProductFilter from "../Produtos/ProductFilter";
import Carrinho from "../Carrinho/Carrinho";
import Produto from "../Produtos/Produto";


// Para <ProductFilter /> dentro do grid, tirar o style do grid:
// style={{paddingLeft: '10%', paddingRight: '10%'}}
// e mudar o marginTop e padding do grid pai para style={{marginTop: 100, padding: 10}}

class Body extends Component {
    render() {
        return (
            <Grid container justify='center' style={{marginTop: 130, padding: 20}}>
                <Grid item xs={12} style={{paddingLeft: '10%', paddingRight: '10%'}}>
                <Switch>
                    
                    <Route exact path='/' component={Destaques}/>
                    <Route exact path='/busca' component={ProductFilter}/>
                    <Route path='/products/:id' component={Produto}/>
                    <Route path='/busca/categorias/:categoryId' component={ProductFilter}/>
                    <Route path='/carrinho' component={Carrinho}/>
                </Switch>
                </Grid>
            </Grid>
        );
    }
}

export default Body;