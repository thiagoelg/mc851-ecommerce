import React, {Component} from 'react';
import Products from "../Products/Products";


class Destaques extends Component {

    render() {
        return (
            <Products highlights={true}/>
        );
    }

}

export default Destaques;
