import React, {Component} from 'react';
import MaskedInput from "react-text-mask";

class CreditCardNumberMask extends Component {

    render() {
        const { inputRef, ...other } = this.props;

        return (
            <MaskedInput
                {...other}
                ref={inputRef}
                mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
                placeholderChar={'_'}
            />
        );

    }
}

export default CreditCardNumberMask;