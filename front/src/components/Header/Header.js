import React, {Component} from 'react';

import {AppBar, Badge, Button, Drawer, Grid, ListItem, Toolbar} from "material-ui";
import SearchInput from '../SearchInput/SearchInput'
import Logo from "../Logo/Logo";
import AccountCircle from "@material-ui/icons/es/AccountCircle";
import ShoppingCart from "@material-ui/icons/es/ShoppingCart";
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { withRouter } from 'react-router-dom';
import NavigateButton from "../NavigateButton/NavigateButton";

const toolBarBottonHeader = {
    backgroundColor: '#F5F5F5',
    height: 20
};


class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            drawerOpened: false,
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

    toggleDrawer() {
        this.setState({
            drawerOpened: !this.state.drawerOpened
        });
    };

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
                                    <Badge badgeContent={0} color="error">
                                        <Button color="inherit">
                                            <ShoppingCart/>
                                            Carrinho
                                        </Button>
                                    </Badge>
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
                                    <div>
                                        <IconButton className="menuButton" color="#212121"
                                                    onClick={() => this.toggleDrawer()}>
                                            <MenuIcon/>
                                        </IconButton>
                                        <Drawer open={this.state.drawerOpened} onClose={() => this.toggleDrawer()}>
                                            <List>
                                                <ListItem button>Eletrodomésticos</ListItem>
                                                <ListItem button>Smartphones</ListItem>
                                                <ListItem button>Informática</ListItem>
                                            </List>
                                            <Divider/>
                                            <List>
                                                <ListItem button>Souveniers</ListItem>
                                                <ListItem button>Livros</ListItem>
                                                <ListItem button>Beleza</ListItem>
                                            </List>
                                        </Drawer>
                                    </div>
                                </Grid>
                                {
                                    this.state.categories.map((category) =>
                                        <Grid item xs={2} alignContent="center" justify="center">
                                            <NavigateButton color='#212121'
                                                    href={`/categorias/${category.id}`}>
                                                {category.name}
                                            </NavigateButton>
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

export default withRouter(Header);