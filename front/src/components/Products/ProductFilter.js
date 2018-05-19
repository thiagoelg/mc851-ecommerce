import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Products from "./Products";
import {getProducts} from "../../clients/ProductsClient";
import ProductFilterFields from "./ProductFilterFields";

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 'auto',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        backgroundColor: 'white',
        padding: theme.spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
    }
});

class ProductFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            categories: [],
            brands: ["Toppen"],
        };

        this.handleOnFilter = this.handleOnFilter.bind(this);
    };

    handleOnFilter(filter) {
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
                <ProductFilterFields onFilter={this.handleOnFilter} defaultCategory={this.props.match.params.categoryId}/>
                <main className={classes.content}>
                    <Products cols={3} products={this.state.products}/>
                </main>
            </div>
        );
    }
}

ProductFilter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductFilter);