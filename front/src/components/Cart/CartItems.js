import React, {Component} from "react"
import {withRouter} from 'react-router-dom'
import Table from "@material-ui/core/es/Table/Table";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import Typography from "@material-ui/core/es/Typography/Typography";
import TextField from "@material-ui/core/es/TextField/TextField";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Delete from "@material-ui/icons/Delete"
import {cart} from "../../cart/Cart"
import Grid from "@material-ui/core/es/Grid/Grid";
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";
import Close from "@material-ui/icons/es/Close";
import MoneyFormatter from "../Formatters/MoneyFormatter";
import {CartResult} from "../../cart/CartResult";

class CartItems extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],

            outOfStock: false,
            productNotFound: false,
            expired: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleProductClick = this.handleProductClick.bind(this);
    }

    handleClose = () => {
        this.setState({
            open: false,
            outOfStock: false,
            expired: false,
            productNotFound: false
        });
    };

    handleProductClick(productId) {
        this.props.history.push(`/products/${productId}`);
    }

    handleChange(e) {
        const target = e.target;
        const productId = target.name;
        const amount = parseInt(target.value, 10);

        this.handleAmountChange(amount, productId);
    }

    handleRemoveClick(productId) {
        this.handleAmountChange(0, productId);
    }

    handleAmountChange(amount, productId) {
        let products = this.state.products;

        const callback = cartResult => {
            switch (cartResult) {

                case CartResult.SUCCESS: {
                    this.updateProductsAmount(amount, productId);
                    break;
                }

                case CartResult.OUT_OF_STOCK: {
                    this.setState({
                        open: true,
                        outOfStock: true,
                    });
                    break;
                }

                case CartResult.PRODUCT_NOT_FOUND: {
                    this.setState({
                        open: true,
                        productNotFound: true,
                    });
                    break;
                }

                case CartResult.EXPIRED: {
                    this.setState({
                        open: true,
                        expired: true,
                        products: []
                    }, () => this.invokeOnChange());
                    break;
                }

                case CartResult.ERROR:
                case CartResult.INTERNAL_ERROR:
                default: {
                    //TODO treat error
                }

            }
        };

        const product = products.filter(p => p.id === productId)[0];
        if (amount > product.amount) {
            cart.add(productId, amount - product.amount)
                .then(callback)
        } else if (amount < product.amount) {
            cart.remove(productId, product.amount - amount)
                .then(callback);
        }
    }

    updateProductsAmount(amount, productId) {

        let newProducts = [];

        if (amount === 0) {
            newProducts = this.state.products.filter(p => p.id !== productId);
        } else {
            newProducts = this.state.products
                .map(product => {
                    if (product.id === productId) {
                        let newProduct = Object.assign({}, product);
                        newProduct.amount = amount;
                        return newProduct;
                    }

                    return product;
                });

        }

        this.setState({
            products: newProducts
        }, () => this.invokeOnChange());
    }

    invokeOnChange() {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                value: this.state.products
            });
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            products: props.products
        });
    }

    render() {

        const products = this.state.products;

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                        open={this.state.open}
                        onClose={this.handleClose}
                        autoHideDuration={5000}
                        message={
                            <span id="message-id">
                                {this.state.outOfStock && "Infelizmente esse produto está esgotado."}
                                {this.state.expired && "Seu carrinho expirou."}
                                {this.state.productNotFound && "Infelizmente nós não vendemos mais esse produto."}
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
                    {this.props.products.length > 0 ? (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Produto</TableCell>
                                    <TableCell>Quantidade</TableCell>
                                    <TableCell numeric>Valor Unitário</TableCell>
                                    <TableCell numeric>Valor Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map(product => {
                                    return (
                                        <TableRow key={product.id}>
                                            <TableCell component="th" scope="row"
                                                       style={{cursor: "pointer"}}
                                                       onClick={e => this.handleProductClick(product.id)}>
                                                <div style={{display: "flex"}}>
                                                    <Avatar
                                                        alt={product.name}
                                                        src={product.imageUrl}/>
                                                    <Typography
                                                        style={{
                                                            marginLeft: 10,
                                                            marginTop: 10
                                                        }}>{product.name}</Typography>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id="amount"
                                                    value={product.amount}
                                                    name={product.id}
                                                    onChange={this.handleChange}
                                                    type="number"
                                                    style={{maxWidth: 50}}
                                                />
                                                <IconButton color="secondary"
                                                            aria-label="Delete"
                                                            onClick={e => this.handleRemoveClick(product.id)}>
                                                    <Delete/>
                                                </IconButton>
                                            </TableCell>
                                            <TableCell numeric>
                                                <Typography>
                                                    <MoneyFormatter value={product.price}/>
                                                </Typography>
                                            </TableCell>
                                            <TableCell numeric>
                                                <Typography>
                                                    <MoneyFormatter value={product.amount * product.price}/>
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    ) : (
                        <Typography variant="subheading" align="center">
                            Você ainda não adicionou nenhum produto no seu carrinho.
                        </Typography>
                    )}
                </Grid>
            </Grid>
        )

    }

}

export default withRouter(CartItems);