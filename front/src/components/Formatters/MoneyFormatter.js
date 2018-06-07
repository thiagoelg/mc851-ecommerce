import React, {Component} from "react"
import NumberFormat from "react-number-format";

class MoneyFormatter extends Component {

    render() {
        return (
            <NumberFormat value={this.props.value}
                          displayType={'text'}
                          prefix={"R$ "}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          decimalScale={2}
                          fixedDecimalScale={true}

            />
        );
    }

}

export default MoneyFormatter;