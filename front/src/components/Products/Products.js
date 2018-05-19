import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import GridList, {GridListTile, GridListTileBar} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Typography from "material-ui/es/Typography/Typography";
import Pagination from "../Pagination";
import Grid from "material-ui/es/Grid/Grid";

class Products extends Component {

    constructor(props) {
        super(props);

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    empty(products) {
        return products != null && products.length > 0;
    }

    handlePageChange(number) {
        this.props.onPageChange(number);
    }

    render() {
        let cols = this.props.cols;
        if (cols === undefined)
            cols = 3;

        let hasPagination = false;
        if (this.props.totalPages != null && this.props.displayedPages != null && this.props.page != null) {
            hasPagination = true;
        }

        let products = this.props.products.map(product => (
            <GridListTile key={product.imageUrl + Math.random()} cols={1}
                          onClick={() => this.props.history.push("/products/" + product.id)}
                          style={{cursor: 'pointer'}}>
                <img src={product.imageUrl} alt={product.name}
                     style={{height: '100%', width: '100%', margin: '0 auto', display: 'block'}}/>
                <GridListTileBar
                    title={product.name}
                    subtitle={<span>{product.description} por {product.price}</span>}
                    actionIcon={
                        <IconButton>
                            <InfoIcon/>
                        </IconButton>
                    }
                />
            </GridListTile>
        ));


        return (
            <div className="products" justify='center'>
                {this.empty() ? (
                    <Typography variant="subheading" gutterBottom>
                        Nenhum produto foi encontrado.
                    </Typography>
                ) : (
                    <Grid container>
                        <Grid item xs={12}>
                            <GridList cellHeight={200} cols={cols}>
                                {products}
                            </GridList>
                        </Grid>
                        {hasPagination && (
                            <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                                <Pagination total={this.props.totalPages}
                                            current={this.props.page}
                                            display={this.props.displayedPages}
                                            onChange={this.handlePageChange}
                                />
                            </Grid>
                        )}

                    </Grid>
                )}
            </div>
        );
    }

}

export default withRouter(Products);