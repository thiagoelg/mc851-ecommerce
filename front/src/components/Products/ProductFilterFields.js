import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Drawer} from "@material-ui/core";
import MultiSelectionCheckboxes from '../MultiSelectionCheckboxes/MultiSelectionCheckboxes'
import Divider from "@material-ui/core/es/Divider/Divider";
import Grid from "@material-ui/core/es/Grid/Grid";
import FormLabel from "@material-ui/core/es/FormLabel";
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import {getCategories} from "../../clients/ProductsClient";

const drawerWidth = 240;

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
});

class ProductFilterFields extends Component {

    constructor(props) {
        super(props);

        const categoryId = this.props.defaultCategory;

        this.state = {
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
        const categoryId = nextProps.defaultCategory;

        this.setState((prevState, props) => {
            if (this.props.defaultCategory !== categoryId) {
                return {
                    minPrice: '',
                    maxPrice: '',
                    selectedCategories: categoryId ? [categoryId] : [],
                    selectedBrands: []
                }
            }

            return {};
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

        if (this.state.minPrice != null && this.state.minPrice.length > 0) {
            filter.min_price = this.state.minPrice;
        }

        if (this.state.maxPrice != null && this.state.maxPrice.length > 0) {
            filter.max_price = this.state.maxPrice;
        }

        if (this.state.selectedCategories.length) {
            filter.category_id = this.state.selectedCategories.join(",");
        }

        if (this.state.selectedBrands.length) {
            filter.brands = this.state.selectedBrands.join(",");
        }


        this.props.onFilter(filter);
    }

    render() {
        const {classes} = this.props;

        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}>

                <div className={classes.toolbar}/>

                <MultiSelectionCheckboxes label="Categorias"
                                          items={this.state.categories}
                                          name="selectedCategories"
                                          value={this.state.selectedCategories}
                                          onChange={this.handleChange}/>
                <Divider/>
                <br/>

                <MultiSelectionCheckboxes label="Marcas"
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
        );
    }

}

ProductFilterFields.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ProductFilterFields);