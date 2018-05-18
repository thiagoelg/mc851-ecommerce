import React, {Component} from 'react';
import Products from "../Products/Products";


class Destaques extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    };

    componentDidMount() {
        fetch('http://back.localhost/products?highlight=' + this.props.highlights)
            .then(results => {
                //TODO check if status ok
                return results.json();
            })
            .then(data => {
                this.setState({products: data});
            })
    }

    render() {
        return (
            <Products products={this.state.products}/>
        );
    }

}

export default Destaques;
