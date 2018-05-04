import React, {Component} from 'react';

import {AppBar, Button, Grid, Toolbar} from "material-ui";
import SearchInput from '../SearchInput/SearchInput'
import Logo from "../Logo/Logo";
import AccountCircle from "@material-ui/icons/es/AccountCircle";
import ShoppingCart from "@material-ui/icons/es/ShoppingCart";
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const toolBarBottonHeader = {
    backgroundColor: '#F5F5F5',
    height: 20
}
    

class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppBar position="fixed">
                <Toolbar>
                    <Grid container spacing={0} alignItems="center" justify="center">
                        <Grid item xs={12} sm={3} alignContent="center">
                            <Logo/>
                        </Grid>

                        <Grid item xs={12} sm={6} alignContent="center" justify="center">
                            <SearchInput/>
                        </Grid>

                        <Grid item xs={12} sm={3} alignContent="center" justify="center">
                            <Grid container spacing={8} alignItems="center">
                                <Grid item xs={0} sm={3} alignContent="center" justify="center"/>
                                <Grid item xs={6} sm={4} alignContent="center" justify="center">
                                    <Button color="inherit">
                                        <AccountCircle/>
                                        Entrar
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sm={4} alignContent="center" justify="center">
                                    <Button color="inherit">
                                        <ShoppingCart/>
                                        Carrinho
                                    </Button>
                                </Grid>
                                <Grid item xs={0} sm={1} alignContent="center" justify="center"/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
                <Toolbar style={toolBarBottonHeader}>
                    <Grid container spacing={0} alignItems="center" justify="center">
                        <Grid item xs={12} alignContent="center" justify="center">
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={1} alignContent="center" justify="center">
                                    <IconButton className="menuButton" color="#212121">
                                        <MenuIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={2} alignContent="center" justify="center">
                                    <Button color='#212121'>
                                        Promoções
                                    </Button>
                                </Grid>
                                <Grid item xs={2} alignContent="center" justify="center">
                                    <Button color='#212121'>
                                        Dia das mães
                                    </Button>
                                </Grid>
                                <Grid item xs={2} alignContent="center" justify="center">
                                    <Button color='#212121'>
                                        Dia dos Namorados
                                    </Button>
                                </Grid>
                                <Grid item xs={2} alignContent="center" justify="center">
                                    <Button color='#212121'>
                                        Oferta do dia
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;