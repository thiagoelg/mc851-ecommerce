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

            page: 1,
            totalPages: null,
            displayedPages: 5,
            filter: {}
        };

        this.handleOnFilter = this.handleOnFilter.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.filter = this.filter.bind(this);
    };

    filter() {
        let params = Object.assign({}, this.state.filter);
        params.page = this.state.page;

        getProducts(params)
            .then(response => {
                this.setState({
                    products: response.data,
                    totalPages: 15 //FIXME ask produtos-1
                });
            })
            .catch(error => {
                //TODO treat error
            });
    }

    handleOnFilter(filter) {
        this.setState({
            filter: filter,
            page: 1
        }, () => this.filter());
    }

    handlePageChange(number) {
        this.setState({
            page: number
        }, () => this.filter())
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <ProductFilterFields onFilter={this.handleOnFilter}
                                     defaultCategory={this.props.match.params.categoryId}
                                    />
                <main className={classes.content}>
                    <Products cols={3} products={this.state.products}
                              page={this.state.page}
                              totalPages={this.state.totalPages}
                              displayedPages={this.state.displayedPages}
                              onPageChange={this.handlePageChange}/>
                </main>
            </div>
        );
    }
}

ProductFilter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductFilter);