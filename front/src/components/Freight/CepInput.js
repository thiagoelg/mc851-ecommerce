import React, {Component} from 'react';
import CepMask from "./CepMask";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Input from "@material-ui/core/es/Input/Input";
import {validateCep} from "../../util/Validators";
import FormHelperText from "@material-ui/core/es/FormHelperText/FormHelperText";

class CepInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            valid: true,
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const target = e.target;

        const value = target.value.replace(/\D+/g, '');
        const valid = validateCep(value);

        this.setState({
            value: target.value,
            valid: valid
        }, () => {
            this.props.onChange({
                target: {
                    value: value,
                    name: this.props.name,
                    valid: valid
                }
            });
        });

    }

    componentWillReceiveProps(props) {
        if(props.value) {
            const valid = validateCep(props.value);

            this.setState({
                value: props.value,
                valid: valid
            });
        }
    }

    render() {
        return (
            <FormControl fullWidth={this.props.fullWidth}>
                <InputLabel htmlFor="cep">CEP</InputLabel>
                <Input
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyPress={this.props.onKeyPress}
                    name={this.props.name}
                    id="cep"
                    inputComponent={CepMask}
                    error={!this.state.valid}
                    disabled={this.props.disabled}
                />
                {!this.state.valid && (
                    <FormHelperText disabled={this.props.disabled} error={!this.state.valid}>
                        O CEP deve ter 8 dígitos numéricos
                    </FormHelperText>
                )}
            </FormControl>
        );
    }

}

export default CepInput;
