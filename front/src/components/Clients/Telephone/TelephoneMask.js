import React, {Component} from 'react';
import MaskedInput from "react-text-mask";

class TelephoneMask extends Component {

    render() {
        const {inputRef, ...other} = this.props;

        return (
            <MaskedInput
                {...other}
                ref={inputRef}
                mask={['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                placeholderChar={'_'}
            />
        );

    }
}

export default TelephoneMask;