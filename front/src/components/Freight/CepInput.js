import React, {Component} from 'react';
import CepMask from "./CepMask";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Input from "@material-ui/core/es/Input/Input";

class CepInput extends Component {

    render() {
        return (
            <FormControl>
                <InputLabel htmlFor="cep" shrink>CEP</InputLabel>
                <Input
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onKeyPress={this.props.onKeyPress}
                    name={this.props.name}
                    id="cep"
                    inputComponent={CepMask}
                />
            </FormControl>
        );
    }

}

export default CepInput;
