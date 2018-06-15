import React, {Component} from 'react';
import Grid from "@material-ui/core/es/Grid/Grid";
import TextField from "@material-ui/core/es/TextField/TextField";
import ShoppingCart from "@material-ui/icons/es/ShoppingCart";
import Button from "@material-ui/core/es/Button/Button";
import Chip from "@material-ui/core/es/Chip/Chip";
import Freight from "../Freight/Freight";
import {getCategory, getProduct} from "../../clients/ProductsClient";
import Typography from "@material-ui/core/es/Typography/Typography";
import {cart} from "../../cart/Cart"
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Close from "@material-ui/icons/es/Close";
import MoneyFormatter from "../Formatters/MoneyFormatter";
import {CartResult} from "../../cart/CartResult";

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            category: {},
            amount: 1,

            open: false,
            outOfStock: false,
            productNotFound: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        this.setState({[target.name]: event.target.value})
    }

    handleClose = () => {
        this.setState({
            open: false,
            outOfStock: false,
            productNotFound: false
        });
    };

    handleAddToCart(event) {

        const productId = this.state.product.id;
        const amount = this.state.amount;

        cart.add(productId, amount)
            .then(cartResult => {
                switch (cartResult) {

                    case CartResult.SUCCESS: {
                        this.props.history.push("/cart");
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
                            productNotFound: true
                        });
                        break;
                    }

                    case CartResult.ERROR:
                    case CartResult.INTERNAL_ERROR:
                    default: {
                        //TODO treat error
                    }

                }
            });
    }

    componentDidMount() {

        getProduct({id: this.props.match.params.id})
            .then(response => {
                const product = response.data;

                this.setState({product: product});

                getCategory({id: product.categoryId})
                    .then(response => {
                        const category = response.data;
                        this.setState({category: category});
                    })
                    .catch(error => {
                        //TODO treat error
                    })
            })
            .catch(error => {
                //TODO treat error
            })
    }

    render() {

        const product = this.state.product;

        const category = this.state.category;

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
                                {this.state.productNotFound && "Infelizmente não vendemos mais esse produto."}
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
                <Grid item xs={4} style={{padding: 20}}>
                    <img src={product.imageUrl} alt={product.name}
                         style={{maxHeight: '100%', maxWidth: '100%', margin: '0 auto', display: 'block'}}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Grid container>
                        <Grid item xs={12}>
                            <h2>{product.name}</h2>
                            {product.tags && product.tags.map(tag =>
                                <Chip key={tag} label={tag} style={{marginRight: 5}}/>)
                            }
                            <br/>
                            <br/>
                            {product.stock > 0 ? (
                                <Typography variant="caption">
                                    Apenas {product.stock} unidades em estoque.
                                </Typography>
                            ) : (
                                <Typography variant="caption" color="error">
                                    <b>ESGOTADO!</b>
                                </Typography>
                            )}
                            <p>
                                <b>Preço:</b> <MoneyFormatter value={product.price}/>
                            </p>
                        </Grid>

                        <Grid item xs={2}>
                            <TextField
                                id="amount"
                                label="Quantidade"
                                value={this.state.amount}
                                name="amount"
                                onChange={this.handleChange}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={1}/>
                        <Grid item xs={9}>
                            <Button variant="raised"
                                    color="secondary"
                                    style={{marginTop: '5%'}}
                                    disabled={product.stock === 0}
                                    onClick={this.handleAddToCart}>
                                <ShoppingCart style={{marginRight: '10'}}/>
                                Adicionar ao Carrinho
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid item xs={12}>
                        <br/>
                        <Freight label="Calcular Frete e Prazo: "
                                 products={[product]}
                                 enableSelection={false}
                                 disableCep={product.stock === 0}/>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <h2>Detalhes:</h2>
                    <p>{product.description}</p>
                    <p>
                        <b>Marca:</b> {product.brand}
                    </p>
                    <p>
                        <b>Categoria:</b> {category.name}
                    </p>
                    <p>
                        <b>Dimensões do Pacote:</b> {product.height} cm x {product.width} cm x {product.length} cm
                    </p>
                    <p>
                        <b>Peso do
                            Pacote:</b> {product.weight < 1000 ? `${product.weight}g` : `${parseFloat(product.weight / 1000).toFixed(2)}kg`}
                    </p>
                </Grid>
            </Grid>
        );
    }
}

export default Product;