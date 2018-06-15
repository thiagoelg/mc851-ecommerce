import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Typography from "@material-ui/core/es/Typography/Typography";
import Pagination from "../Pagination/Pagination";
import Grid from "@material-ui/core/es/Grid";
import {getProducts, getProductsByFullSearch} from "../../clients/ProductsClient";
import Link from "../Link/Link";
import MoneyFormatter from "../Formatters/MoneyFormatter";
import {treatError} from "../../util/ErrorUtils";
import Fade from "@material-ui/core/es/Fade/Fade";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";

class Products extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            page: 1,
            totalPages: null,
            displayedPages: 5,

            loading: true
        };

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        this.filter(this.props);
    }

    componentWillReceiveProps(props) {
        this.filter(props);
    }

    filter(props) {
        let params = Object.assign({}, props.filter);
        params.page = this.state.page;

        params.search = props.search;

        this.setState({
            loading: true,
        }, () => {
            if (params.search) {
                getProductsByFullSearch(params)
                    .then(response => {
                        this.setState({
                            products: response.data,
                            totalPages: 15, //FIXME ask produtos-1
                            loading: false
                        });
                    })
                    .catch(error => {
                        treatError(this.props, error);
                    });
            } else {
                getProducts(params)
                    .then(response => {
                        this.setState({
                            products: response.data,
                            totalPages: 15, //FIXME ask produtos-1
                            loading: false
                        });
                    })
                    .catch(error => {
                        treatError(this.props, error);
                    });
            }
        });
    }

    empty() {
        return this.state.products.length === 0;
    }

    handlePageChange(number) {
        this.setState({
            page: number
        }, () => this.filter(this.props))
    }

    render() {
        let cols = this.props.cols;
        if (cols === undefined)
            cols = 3;

        let products = this.state.products.map(product => (
            <GridListTile cols={1} key={product.id}>
                <Link to={`/products/${product.id}`}>
                    <img src={product.imageUrl} alt={product.name}
                         style={{maxHeight: '100%', maxWidth: '100%', margin: '0 auto', display: 'block'}}/>
                    <GridListTileBar
                        title={product.name}
                        subtitle={
                            <span>
                                {product.stock > 0 ? (
                                    <p>
                                        Por <MoneyFormatter value={product.price}/>
                                    </p>
                                ) : (
                                    <p>
                                        <b>ESGOTADO!</b>
                                    </p>
                                )}

                            </span>
                        }
                        actionIcon={
                            <IconButton>
                                <InfoIcon/>
                            </IconButton>
                        }
                    />
                </Link>
            </GridListTile>
        ));


        return (
            <span>
                {this.state.loading ? (
                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                        <Fade
                            in={this.state.loading}
                            style={{
                                transitionDelay: this.state.loading ? '800ms' : '0ms'
                            }}
                            unmountOnExit
                        >
                            <CircularProgress/>
                        </Fade>
                    </Grid>
                ) : (
                    <div className="products" justify='center'>
                        {this.empty() ? (
                            <Typography variant="subheading" gutterBottom>
                                Nenhum produto foi encontrado.
                            </Typography>
                        ) : (
                            <Grid container>
                                <Grid item xs={12}>
                                    <GridList cellHeight={300} cols={cols}>
                                        {products}
                                    </GridList>
                                </Grid>
                                {this.state.totalPages > 1 && (
                                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                                        <Pagination total={this.state.totalPages}
                                                    current={this.state.page}
                                                    display={this.state.displayedPages}
                                                    onChange={this.handlePageChange}
                                        />
                                    </Grid>
                                )}

                            </Grid>
                        )}
                    </div>
                )}
            </span>
        );
    }

}

export default withRouter(Products);
