import React, {Component} from 'react';
import InputMask from 'react-input-mask'

class CepMask extends Component {

    render() {
        return (
            <InputMask mask="99999-999" maskChar="_" />
        );

    }
}

export default CepMask;