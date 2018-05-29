import React, {Component} from 'react';
import Grid from "@material-ui/core/es/Grid";
import {Route, Switch} from 'react-router-dom'
import Highlights from "../Products/Highlights";
import ProductFilter from "../Products/ProductFilter";
import Carrinho from "../Carrinho/Carrinho";
import Product from "../Products/Product";
import SignUp from "../Clients/SignUp";
import SignIn from "../Clients/SignIn";
import Profile from "../Clients/Profile";
import UpdateProfile from "../Clients/UpdateProfile";
import ChangePassword from "../Clients/ChangePassword";
import NotFound from "../Common/NotFound";
import EndShopping from "../Carrinho/EndShopping";
import CustomerService from "../CustomerService/CustomerService";
import Ticket from "../CustomerService/Ticket";


// Para <ProductFilter /> dentro do grid, tirar o style do grid:
// style={{paddingLeft: '10%', paddingRight: '10%'}}
// e mudar o marginTop e padding do grid pai para style={{marginTop: 100, padding: 10}}

class Body extends Component {
    render() {
        return (
            <Grid container justify='center' style={{marginTop: 130, padding: 20}}>
                <Grid item xs={12} style={{paddingLeft: '10%', paddingRight: '10%'}}>
                <Switch>
                    
                    <Route exact path='/' component={Highlights}/>
                    <Route exact path='/busca' component={ProductFilter}/>
                    <Route path='/busca?search=:search' component={ProductFilter}/>
                    <Route path='/busca?categoryId=:categoryId' component={ProductFilter}/>
                    <Route path='/products/:id' component={Product}/>
                    <Route exact path='/signUp' component={SignUp}/>
                    <Route exact path='/signIn' component={SignIn}/>
                    <Route exact path='/profile' component={Profile}/>
                    <Route exact path='/profile/update' component={UpdateProfile}/>
                    <Route exact path='/profile/changepassword' component={ChangePassword}/>
                    <Route path='/carrinho' component={Carrinho}/>
                    <Route path='/endShopping' component={EndShopping}/>
                    <Route exact path='/customerservice' component={CustomerService}/>
                    <Route path='/customerservice/purchase/:purchaseId' component={CustomerService}/>
                    <Route path='/customerservice/ticket/:id' component={Ticket}/>
                    <Route component={NotFound}/>
                </Switch>
                </Grid>
            </Grid>
        );
    }
}

export default Body;