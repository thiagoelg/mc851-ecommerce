import React, {Component} from 'react';
import TextField from "material-ui/es/TextField/TextField";

class CepInput extends Component {
    // FIXME add cep mask
    // InputProps={{
    //     inputComponent: CepMask
    // }}

    render() {
        return (
            <TextField
                label="CEP"
                onChange={this.props.onChange}
                onKeyPress={this.props.onKeyPress}
                name={this.props.name}
                value={this.props.value}
            >

            </TextField>
        );

    }
}

export default CepInput;