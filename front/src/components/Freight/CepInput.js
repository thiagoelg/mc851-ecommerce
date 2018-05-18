import React, {Component} from 'react';
import Input from "material-ui/es/Input/Input";
import CepMask from "./CepMask";

class CepInput extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Input
                label="CEP"
                id="cep"
                inputComponent={CepMask}
            />
        );

    }
}

export default CepInput;