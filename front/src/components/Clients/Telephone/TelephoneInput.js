import React, {Component} from 'react';
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Input from "@material-ui/core/es/Input/Input";
import FormHelperText from "@material-ui/core/es/FormHelperText/FormHelperText";
import {validateTelephone} from "../../../util/Validators";
import TelephoneMask from "./TelephoneMask";

class TelephoneInput extends Component {

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
        const valid = validateTelephone(value);

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
        if (props.value) {
            const valid = validateTelephone(props.value);

            this.setState({
                value: props.value,
                valid: valid
            });
        }
    }

    render() {
        return (
            <FormControl fullWidth={this.props.fullWidth}>
                <InputLabel htmlFor="telephone">Telefone</InputLabel>
                <Input
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyPress={this.props.onKeyPress}
                    name={this.props.name}
                    id="telephone"
                    inputComponent={TelephoneMask}
                    error={!this.state.valid}
                    disabled={this.props.disabled}
                />
                {!this.state.valid && (
                    <FormHelperText disabled={this.props.disabled} error={!this.state.valid}>
                        Informe um telefone válido.
                    </FormHelperText>
                )}
            </FormControl>
        );
    }

}

export default TelephoneInput;
