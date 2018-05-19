import React, {Component} from 'react';
import Products from "./Products";
import {getProducts} from "../../clients/ProductsClient";
import Typography from "material-ui/es/Typography/Typography";


class Highlights extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
        };
    };

    componentDidMount() {
        this.refreshProducts();
    }

    refreshProducts() {
        const filter = {
            highlight: this.props.highlights,
        };

        getProducts(filter)
            .then(response => {
                this.setState({
                    products: response.data,
                });
            })
            .catch(error => {
                //TODO treat error
            });
    }

    render() {
        return (
            <div>
                <Typography variant="headline" gutterBottom>
                    Destaques
                </Typography>
                <Products products={this.state.products} cols={4}/>
            </div>
        );
    }

}

export default Highlights;
