import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import GridList, {GridListTile, GridListTileBar} from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {AppBar, Button, Grid, Toolbar, Drawer, ListItem, Badge} from "material-ui";
import CheckboxesGroup from '../FiltroCategoria/CheckboxesGroup'
import Product from "../Products/Product";
import Products from "../Products/Products";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 'auto',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        backgroundColor: 'white',
        padding: theme.spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
});

class FiltroCategoria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categories: []
        }
    };

    componentDidMount() {
        fetch('http://back.localhost/products?highlight=' + this.props.highlights)
            .then(results => {
                //TODO check if status ok
                return results.json();
            })
            .then(data => {
                this.setState({products: data});
            })

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
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}>
                    <div className={classes.toolbar}/>
                    <CheckboxesGroup label="Categorias" content={this.state.categories}/>
                </Drawer>
                <main className={classes.content}>
                    <Products cols={3} products={this.state.products}/>
                </main>
            </div>
        );
    }
}

FiltroCategoria.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FiltroCategoria);