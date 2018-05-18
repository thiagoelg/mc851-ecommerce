import React, {Component} from 'react';
import Grid from "material-ui/es/Grid/Grid";
import TextField from "material-ui/es/TextField/TextField";
import Button from "material-ui/es/Button/Button";
import ShoppingCart from "@material-ui/icons/es/ShoppingCart";

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
                    <img src={product.imageUrl} alt={product.name} height={300}/>
                </Grid>
                <Grid item xs={8}>
                    <Grid container>
                        <Grid item xs={12}>
                            <h2>{product.name}</h2>
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
                            <Button variant="raised" color="secondary" style={{marginTop:'5%'}}>
                                <ShoppingCart style={{marginRight: '10'}}/>
                                Adicionar ao Carrinho
                            </Button>
                        </Grid>

                    </Grid>

                    {/*<Grid item xs={12}>*/}
                        {/*<Freight/>*/}
                    {/*</Grid>*/}
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
                        <b>Dimensões:</b> {product.height} cm x {product.width} cm x {product.length} cm
                    </p>
                </Grid>
            </Grid>
        );
    }
}

export default Product;