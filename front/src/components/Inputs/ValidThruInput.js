import React, {Component} from 'react';
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Input from "@material-ui/core/es/Input/Input";
import {validateValidThruDate} from "../../util/Validators";
import FormHelperText from "@material-ui/core/es/FormHelperText/FormHelperText";
import ValidThruMask from "./ValidThruMask";

class ValidThruInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            valid: false,
            value: '',

            touched: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const target = e.target;

        const value = target.value;
        const valid = validateValidThruDate(value);

        this.setState({
            value: target.value,
            valid: valid,
            touched: true
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
            const valid = validateValidThruDate(props.value);

            this.setState({
                value: props.value,
                valid: valid
            });
        }
    }

    render() {
        return (
            <FormControl fullWidth={this.props.fullWidth} error={!this.state.valid && this.state.touched}>
                <InputLabel htmlFor="validThru">Data de Validade</InputLabel>
                <Input
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyPress={this.props.onKeyPress}
                    onFocus={this.props.onFocus}
                    name={this.props.name}
                    id="validThru"
                    inputComponent={ValidThruMask}
                    disabled={this.props.disabled}
                />
                {!this.state.valid && this.state.touched && (
                    <FormHelperText disabled={this.props.disabled}>
                        Informe um cartão que não esteja vencido
                    </FormHelperText>
                )}
            </FormControl>
        );
    }

}

export default ValidThruInput;
