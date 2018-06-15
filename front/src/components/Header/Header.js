import React, {Component} from 'react';
import {AppBar, Button, Grid, Toolbar} from "@material-ui/core";
import SearchInput from '../Products/SearchInput'
import Logo from "../Logo/Logo";
import {withStyles} from '@material-ui/core/styles';
import Link from "../Link/Link";
import UserButtons from "./UserButtons";
import CartButton from "./CartButton";
import {getCategories} from "../../clients/ProductsClient";
import {withRouter} from "react-router-dom";
import {treatError} from "../../util/ErrorUtils";

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
        getCategories()
            .then(response => {
                const data = response.data;

                this.setState({categories: data});
            })
            .catch(error => {
                //FIXME infinite redirections treatError(this.props, error)
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
                                <Grid item xs={false} sm={2}/>
                                <Grid item xs={12} sm={5}>
                                    <UserButtons/>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <CartButton/>
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
                                        <Grid key={category.id} item xs={2}
                                              style={{display: 'flex', justifyContent: 'center'}}>
                                            <Link to={`/busca?categoryId=${category.id}`}>
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

export default withRouter(withStyles(styles)(Header));
