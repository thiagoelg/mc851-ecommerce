import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Divider from '@material-ui/core/Divider';
import Freight from "../Freight/Freight";
import CartItems from "./CartItems";
import {cart} from "../../cart/Cart"
import {CartResult} from "../../cart/CartResult"
import MoneyFormatter from "../Formatters/MoneyFormatter";
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Close from "@material-ui/icons/es/Close";
import UserProfile from "../../state/UserProfile";
import Link from "../Link/Link";
import {treatError} from "../../util/ErrorUtils";

class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            shipping: {},
            cep: '',

            open: false,
            missingFreight: false
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleCartItemsChange = this.handleCartItemsChange.bind(this)
        this.handleFreightClick = this.handleFreightClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handlePurchaseClick = this.handlePurchaseClick.bind(this)
    }

    handleClose = () => {
        this.setState({
            open: false,
            missingFreight: false
        });
    };

    handlePurchaseClick(event) {
        if(!this.state.shipping.price) {
            this.setState({
                open: true,
                missingFreight: true
            });
            return;
        }
       
        this.props.history.push({
            pathname: "/checkout",
            state: {
                shipping: this.state.shipping,
                cep: this.state.cep,
                products: this.state.products
            }
        });


    }

    handleFreightClick(event) {
        const shipping = event.value;
        const cep = event.cep;
        this.setState({
            shipping: shipping,
            cep: cep
        });
    }

    handleChange(event) {
        const target = event.target;
        this.setState({[target.name]: event.target.value})
    }

    handleCartItemsChange(event) {
        this.setState({
            products: event.value,
            shipping: {}
        });
    }

    componentDidMount() {

        cart.getContext()
            .then(cartContext => {
                switch (cartContext.result) {

                    case CartResult.SUCCESS: {
                        const products = cartContext.products;
                        this.setState({
                            products: products
                        });
                        break;
                    }

                    case CartResult.EXPIRED: {

                        break;
                    }

                    case CartResult.INTERNAL_ERROR: {
                        const error = {
                            response: {
                                status: 500
                            }
                        };
                        treatError(this.props, error);
                        return;
                    }
                    case CartResult.ERROR:
                    default: {
                        treatError(this.props);
                    }

                }
            });

    }

    render() {
        const products = this.state.products;

        const subTotal = products.reduce((acc, product) => acc + product.price * product.amount, 0);

        const numberOfProducts = products ? products.reduce((acc, p) => acc + p.amount, 0) : 0;

        const freight = this.state.shipping.price / 100;

        const total = freight ? freight + subTotal : subTotal;

        return (
            <Grid container spacing={24} height="auto">
                <Grid item xs={12}>
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                        open={this.state.open}
                        onClose={this.handleClose}
                        autoHideDuration={5000}
                        message={
                            <span id="message-id" color="error">
                                {this.state.missingFreight && (
                                    <p>
                                        Informe o CEP do endereço de entrega e selecione o frete desejada.
                                    </p>
                                )}
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
                    <Typography variant="headline">
                        Meu Carrinho
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <CartItems name="products" products={products} onChange={this.handleCartItemsChange}/>
                </Grid>
                {products && products.length > 0 &&
                <Grid container>
                    <Grid item xs={8}>
                        <div style={{margin: 20}}>
                            <Freight
                                name="shipping"
                                label="Calcular Frete e Prazo: "
                                products={products}
                                onChange={this.handleFreightClick}
                                enableSelection={true}/>
                        </div>
                    </Grid>
                    <Grid item xs={4} style={{marginTop: 20}}>
                        <Card>
                            <CardContent>
                                <p>subtotal ({numberOfProducts} produtos): <b><MoneyFormatter value={subTotal}/></b>
                                </p>
                                <p>frete:
                                    {freight ? (
                                        <b> <MoneyFormatter value={freight}/></b>
                                    ) : (
                                        <Typography variant="caption" color="error">
                                            Informe seu CEP e selecione um método de entrega.
                                        </Typography>
                                    )}
                                </p>
                                <Divider/>
                                <p></p>
                                <Typography variant="subheading">
                                    Total: <b><MoneyFormatter value={total}/></b>
                                </Typography>
                                <Typography variant="caption">
                                    Em até 12x sem juros no cartão de crédito
                                </Typography>
                                <Typography variant="caption" color="secondary">
                                    <MoneyFormatter value={total}/> no boleto
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container
                              direction="row"
                              justify="flex-end"
                              alignItems="center"
                              style={{marginTop: 20, marginBottom: 20}}>
                            <Grid item>
                                {UserProfile.isLogged() ? (
                                    <Button variant="raised" color="secondary" onClick={this.handlePurchaseClick}>
                                        Comprar
                                    </Button>
                                ) : (
                                    <Link to="/signIn">
                                        <Button variant="raised" color="secondary" >
                                            Comprar
                                        </Button>
                                    </Link>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                }
            </Grid>
        );
    }
}

export default withRouter(Cart);