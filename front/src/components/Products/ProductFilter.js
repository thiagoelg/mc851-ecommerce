import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Products from "./Products";
import ProductFilterFields from "./ProductFilterFields";
import QueryString from 'query-string'

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
            filter: {}
        };

        this.handleOnFilter = this.handleOnFilter.bind(this);
    };

    handleOnFilter(filter) {
        this.setState({
            filter: filter,
        });
    }

    render() {
        const {classes} = this.props;

        const queryParameters = QueryString.parse(this.props.location.search);
        const categoryId = queryParameters.categoryId;
        const search = queryParameters.search;

        return (
            <div className={classes.root}>
                <ProductFilterFields onFilter={this.handleOnFilter}
                                     defaultCategory={categoryId}
                />
                <main className={classes.content}>
                    <Products cols={3} filter={this.state.filter} search={search}/>
                </main>
            </div>
        );
    }
}

ProductFilter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductFilter);