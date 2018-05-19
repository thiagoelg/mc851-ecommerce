import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Drawer} from "material-ui";
import CheckboxesGroup from './/CheckboxesGroup'
import Products from "../Products/Products";
import Divider from "material-ui/es/Divider/Divider";
import Grid from "material-ui/es/Grid/Grid";
import FormLabel from "material-ui/es/Form/FormLabel";
import TextField from "material-ui/es/TextField/TextField";
import {getCategories, getProducts} from "../../clients/ProductsClient";
import Button from "material-ui/es/Button/Button";

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

        const categoryId = this.props.match.params.categoryId;

        this.state = {
            products: [],
            categories: [],
            brands: ["Toppen"],

            minPrice: '',
            maxPrice: '',
            selectedCategories: categoryId ? [categoryId] : [],
            selectedBrands: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFilterClick = this.handleFilterClick.bind(this);
    };

    componentDidMount() {
        this.filter();

        getCategories()
            .then(response => {
                this.setState({categories: response.data});
            })
            .catch(error => {
                //TODO treat error
            });

    }

    componentWillReceiveProps(nextProps) {

        this.setState((prevState, props) => {
            return {
                selectedCategories: [props.match.params.categoryId]
            }
        });

    }

    handleChange(event) {
        const target = event.target;
        this.setState({[target.name]: target.value});
    }

    handleFilterClick(event) {
        this.filter();
    }

    filter() {
        let filter = {};

        if (this.state.minPrice != null) {
            filter.min_price = this.state.minPrice;
        }

        if (this.state.maxPrice != null) {
            filter.max_price = this.state.maxPrice;
        }

        if (this.state.selectedCategories.length) {
            filter.category_id = this.state.selectedCategories.join(",");
        }

        if (this.state.selectedBrands.length) {
            filter.brands = this.state.selectedBrands.join(",");
        }

        getProducts(filter)
            .then(response => {
                this.setState({products: response.data});
            })
            .catch(error => {
                //TODO treat error
            });
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

                    <CheckboxesGroup label="Categorias"
                                     items={this.state.categories}
                                     name="selectedCategories"
                                     value={this.state.selectedCategories}
                                     onChange={this.handleChange}/>
                    <Divider/>
                    <br/>

                    <CheckboxesGroup label="Marcas"
                                     content={this.state.brands}
                                     name="selectedBrands"
                                     value={this.state.selectedBrands}
                                     onChange={this.handleChange}/>
                    <Divider/>
                    <br/>

                    <Grid container>
                        <Grid item xs={4} style={{marginTop: 25}}>
                            <FormLabel component="legend">Preço: </FormLabel>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField name="minPrice" onChange={this.handleChange} value={this.state.minPrice}
                                       label="min" fullWidth/>
                        </Grid>
                        <Grid item xs={1}/>
                        <Grid item xs={3}>
                            <TextField name="maxPrice" onChange={this.handleChange} value={this.state.maxPrice}
                                       label="max" fullWidth/>
                        </Grid>
                    </Grid>

                    <br/>
                    <Button variant="raised" color="secondary" className={classes.button} onClick={this.handleFilterClick}>
                        Filtrar
                    </Button>
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