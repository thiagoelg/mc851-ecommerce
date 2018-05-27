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
import {validatePositiveFloatNumber} from "../../util/Validators";
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Close from "@material-ui/icons/es/Close";

const drawerWidth = 240;

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
        padding: 20
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
            selectedBrands: [],

            validMinPrice: true,
            validMaxPrice: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFilterClick = this.handleFilterClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
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

        //TODO get brands

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
        const name = target.name;

        this.setState({
            [name]: target.value
        }, () => {
            let validMinPrice = this.state.validMinPrice;
            let validMaxPrice = this.state.validMaxPrice;

            if (name === "minPrice") {
                validMinPrice = validatePositiveFloatNumber(this.state.minPrice);
            } else if (name === "maxPrice") {
                validMaxPrice = validatePositiveFloatNumber(this.state.maxPrice);
            }

            this.setState({
                validMinPrice: validMinPrice,
                validMaxPrice: validMaxPrice
            })
        });
    }

    handleFilterClick(event) {
        this.filter();
    }

    handleClose = () => {
        this.setState({
            open: false,
            duplicateEmail: false
        });
    };

    filter() {

        let filter = {};

        if (this.state.minPrice != null && this.state.minPrice.length > 0) {
            if(!this.state.validMinPrice) {
                this.setState({
                    open: true
                });
                return;
            }
            filter.min_price = this.state.minPrice;
        }

        if (this.state.maxPrice != null && this.state.maxPrice.length > 0) {
            if(!this.state.validMaxPrice) {
                this.setState({
                    open: true
                });
                return;
            }
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
            <div>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}>

                    <Grid container>
                        <Grid item xs={12}>
                            <Snackbar
                                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                                open={this.state.open}
                                onClose={this.handleClose}
                                autoHideDuration={5000}
                                message={
                                    <span id="message-id" color="error">
                                        {(!this.state.validMinPrice || !this.state.validMaxPrice) &&
                                            <p>Preencha todos os campos corretamente.<br/></p>
                                        }
                                    </span>}
                                action={[
                                    <IconButton
                                        key="close"
                                        aria-label="Close"
                                        color="inherit"
                                        onClick={this.handleClose}
                                    >
                                        <Close/>
                                    </IconButton>,
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <MultiSelectionCheckboxes label="Categorias"
                                                      items={this.state.categories}
                                                      name="selectedCategories"
                                                      value={this.state.selectedCategories}
                                                      onChange={this.handleChange}/>
                            <Divider/>
                            <br/>
                        </Grid>

                        <Grid item xs={12}>
                            <MultiSelectionCheckboxes label="Marcas"
                                                      content={this.state.brands}
                                                      name="selectedBrands"
                                                      value={this.state.selectedBrands}
                                                      onChange={this.handleChange}/>
                            <Divider/>
                            <br/>
                        </Grid>


                        <Grid item xs={12}>
                            <FormLabel component="legend">Preço: </FormLabel>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="minPrice"
                                       type="number"
                                       onChange={this.handleChange}
                                       value={this.state.minPrice}
                                       label="min"
                                       error={!this.state.validMinPrice}
                                       helperText={!this.state.validMinPrice && "Informe um valor em reais válido."}
                                       fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="maxPrice"
                                       type="number"
                                       onChange={this.handleChange}
                                       value={this.state.maxPrice}
                                       label="max"
                                       error={!this.state.validMaxPrice}
                                       helperText={!this.state.validMaxPrice && "Informe um valor em reais válido."}
                                       fullWidth/>
                        </Grid>

                        <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', paddingTop: 20}}>
                            <Button variant="raised" color="secondary" className={classes.button} fullWidth
                                    onClick={this.handleFilterClick}>
                                Filtrar
                            </Button>
                        </Grid>
                    </Grid>
                </Drawer>
            </div>
        );
    }

}

ProductFilterFields.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ProductFilterFields);