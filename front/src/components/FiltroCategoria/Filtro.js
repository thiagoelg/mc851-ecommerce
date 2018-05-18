import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Drawer} from "material-ui";
import CheckboxesGroup from '../FiltroCategoria/CheckboxesGroup'
import Products from "../Products/Products";
import Divider from "material-ui/es/Divider/Divider";
import Grid from "material-ui/es/Grid/Grid";
import FormLabel from "material-ui/es/Form/FormLabel";
import TextField from "material-ui/es/TextField/TextField";

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

class Filtro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categories: [],

            minPrice: 0.0,
            maxPrice: 1000.0
        };
        this.handleChange = this.handleChange.bind(this);
    };

    componentDidMount() {
        fetch(`http://back.localhost/products?highlight=${this.props.highlights}`)
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

    handleChange(event) {
        const target = event.target;
        this.setState({[target.name]: target.value});
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

                    <CheckboxesGroup label="Categorias" items={this.state.categories}/>
                    <Divider/>
                    <br/>

                    <CheckboxesGroup label="Marcas" content={["Toppen"]}/>
                    <Divider/>
                    <br/>

                    <Grid container>
                        <Grid item xs={4} style={{marginTop: 25}}>
                            <FormLabel component="legend">Preço: </FormLabel>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField name="minPrice" onChange={this.handleChange} value={this.state.minPrice} label="min" fullWidth/>
                        </Grid>
                        <Grid item xs={1}/>
                        <Grid item xs={3}>
                            <TextField name="maxPrice" onChange={this.handleChange} value={this.state.maxPrice} label="max" fullWidth/>
                        </Grid>
                    </Grid>
                </Drawer>
                <main className={classes.content}>
                    <Products cols={3} products={this.state.products}/>
                </main>
            </div>
        );
    }
}

Filtro.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Filtro);