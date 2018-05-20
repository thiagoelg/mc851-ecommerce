import React, {Component} from 'react';

import {AppBar, Badge, Button, Grid, Toolbar} from "material-ui";
import SearchInput from '../SearchInput/SearchInput'
import Logo from "../Logo/Logo";
import AccountCircle from "@material-ui/icons/es/AccountCircle";
import ShoppingCart from "@material-ui/icons/es/ShoppingCart";
import {withStyles} from 'material-ui/styles';
import Link from "../Link/Link";

const toolBarBottonHeader = {
    backgroundColor: '#F5F5F5',
    height: 20
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 430,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    toolbar: theme.mixins.toolbar,
});

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        fetch('http://back.localhost/products/categories')
            .then(results => {
                //TODO check if status ok
                return results.json();
            })
            .then(data => {
                this.setState({categories: data});
            })
    }

    render() {
        return (
            <AppBar position="fixed">
                <Toolbar>
                    <Grid container spacing={0} alignItems="center" justify="center">
                        <Grid item xs={12} sm={3}>
                            <Logo/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <SearchInput/>
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <Grid container spacing={8} alignItems="center">
                                <Grid item xs={false} sm={3}/>
                                <Grid item xs={6} sm={4}>
                                    <Button color="inherit">
                                        <AccountCircle/>
                                        Entrar
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sm={4}>
                                    <Badge badgeContent={0} color="secondary">
                                        <Link to="/carrinho">
                                            <ShoppingCart/>
                                            Carrinho
                                        </Link>
                                    </Badge>
                                </Grid>
                                <Grid item xs={false} sm={1}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
                <Toolbar style={toolBarBottonHeader}>
                    <Grid container spacing={0} alignItems="center" justify="center">
                        <Grid item xs={12}>
                            <Grid container spacing={0} alignItems="center">
                                {
                                    this.state.categories.map((category) =>
                                        <Grid key={category.id} item xs={2}>
                                            <Link to={`/busca/categorias/${category.id}`}>
                                                <Button color='default'>
                                                    {category.name}
                                                </Button>
                                            </Link>
                                        </Grid>
                                    )
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Header);
