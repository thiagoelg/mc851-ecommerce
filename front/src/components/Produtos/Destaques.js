import React, {Component} from 'react';
import Products from "./Produtos";
import {getProducts} from "../../clients/ProductsClient";


class Destaques extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    };

    componentDidMount() {
        const filter = {
            highlight: this.props.highlights
        };

        getProducts(filter)
            .then(response => {
                this.setState({products: response.data});
            })
            .catch(error => {
                //TODO treat error
            });
    }

    render() {
        return (
            <Products products={this.state.products} cols={4}/>
        );
    }

}

export default Destaques;
