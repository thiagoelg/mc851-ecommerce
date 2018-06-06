import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import Badge from "@material-ui/core/es/Badge/Badge";
import Button from "@material-ui/core/es/Button/Button";
import ShoppingCart from "@material-ui/icons/es/ShoppingCart";
import {cart} from "../../cart/Cart";

class CartButton extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.history.push("/cart");
    }

    render() {
        const counter = cart.getNumberOfProducts();

        const button = (
            <Button color="inherit" onClick={this.handleClick}>
                <ShoppingCart/>
                Carrinho
            </Button>
        );

        if (counter) {
            return (
                <Badge badgeContent={counter} color="secondary">
                    {button}
                </Badge>
            );
        }

        return button;
    }

}

export default withRouter(CartButton);