import React, {Component} from 'react';
import Grid from "material-ui/es/Grid/Grid";
import TextField from "material-ui/es/TextField/TextField";
import ShoppingCart from "@material-ui/icons/es/ShoppingCart";
import Button from "material-ui/es/Button/Button";
import Link from "../Link/Link";
import Chip from "material-ui/es/Chip/Chip";
import Freight from "../Freight/Freight";

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            category: {},
            amount: 1
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const target = event.target
        this.setState({[target.name]: event.target.value})
    }

    componentDidMount() {
        fetch('http://back.localhost/products/' + this.props.match.params.id)
            .then(response => {
                //TODO check response.ok
                return response.json();
            }).then(product => {

            this.setState({product: product});

            fetch('http://back.localhost/products/categories/' + product.categoryId)
                .then(response => {
                    //TODO check response.ok
                    return response.json();
                }).then(category => {
                this.setState({category: category});
            })
        })
    }

    render() {

        const product = this.state.product;

        const category = this.state.category;

        return (
            <Grid container>
                <Grid item xs={4}>
                    <img src={product.imageUrl} alt={product.name} height={300} width={300}/>
                </Grid>
                <Grid item xs={8}>
                    <Grid container>
                        <Grid item xs={12}>
                            <h2>{product.name}</h2>
                            {product.tags && product.tags.map(tag =>
                                <Chip key={tag} label={tag} style={{marginRight: 5}} />)
                            }
                            <p>
                                <b>Preço:</b> R$ {parseFloat(product.price).toFixed(2)}
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
                            <Link to="/carrinho">
                                <Button variant="raised" color="secondary" style={{marginTop: '5%'}}>
                                    <ShoppingCart style={{marginRight: '10'}}/>
                                    Adicionar ao Carrinho
                                </Button>
                            </Link>
                        </Grid>

                    </Grid>

                    <Grid item xs={12}>
                        <br/>
                        <Freight product={product}/>
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