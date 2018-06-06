import React, {Component} from 'react';
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Input from "@material-ui/core/es/Input/Input";
import {validateCreditCardNumber} from "../../util/Validators";
import FormHelperText from "@material-ui/core/es/FormHelperText/FormHelperText";
import CreditCardNumberMask from "./CreditCardNumberMask";

class CreditCardNumberInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            valid: true,
            value: '',

            touched: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const target = e.target;

        const value = target.value.replace(/\D+/g, '');
        const valid = validateCreditCardNumber(value);

        this.setState({
            value: target.value,
            valid: valid,
            touched: true
        }, () => {
            this.props.onChange({
                target: {
                    value: value,
                    name: this.props.name
                }
            });
        });

    }

    componentWillReceiveProps(props) {
        if(props.value) {
            const valid = validateCreditCardNumber(props.value);

            this.setState({
                value: props.value,
                valid: valid
            });
        }
    }

    render() {
        return (
            <FormControl fullWidth={this.props.fullWidth} error={(!this.state.valid || this.props.error) && this.state.touched}>
                <InputLabel htmlFor="creditCardNumber">Número do Cartão</InputLabel>
                <Input
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyPress={this.props.onKeyPress}
                    onFocus={this.props.onFocus}
                    name={this.props.name}
                    id="creditCardNumber"
                    inputComponent={CreditCardNumberMask}
                    disabled={this.props.disabled}
                />
                {(!this.state.valid || this.props.error) && this.state.touched && (
                    <FormHelperText disabled={this.props.disabled}>
                        O número do cartão deve ser válido
                    </FormHelperText>
                )}
            </FormControl>
        );
    }

}

export default CreditCardNumberInput;
