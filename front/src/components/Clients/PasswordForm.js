import React, {Component} from "react"
import {withRouter} from "react-router-dom";
import {validatePassword, validateSamePass} from "../../util/Validators";
import Grid from "@material-ui/core/es/Grid/Grid";
import TextField from "@material-ui/core/es/TextField/TextField";
import UserProfile from "../../state/UserProfile";

class PasswordForm extends Component {

    constructor(props) {
        super(props);

        const value = props.value;
        this.state = {
            password: value.password,
            samePass: value.password,

            wrongPassword: value.wrongPassword,
            wrongSamePass: value.wrongSamePass
        };

        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        const target = e.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        }, () => {

            if (name === "password") {
                this.setState((prevState, props) => {
                    return {
                        wrongPassword: !validatePassword(prevState.password)
                    }
                }, () => this.onChange());
            } else if (name === "samePass") {
                this.setState((prevState, props) => {
                    return {
                        wrongSamePass: !validateSamePass(prevState.password, prevState.samePass)
                    }
                }, () => this.onChange());
            }

        });
    }

    onChange() {
        if (this.props.onChange) {

            this.props.onChange({
                target: {
                    name: this.props.name,
                    value: {
                        password: this.state.password,
                        valid: !this.state.wrongPassword && !this.state.wrongSamePass
                    }
                }
            });

        }
    }

    render() {

        return (
            <Grid container>
                <Grid item xs={12}>
                    <br/>

                    <TextField label="Senha" name="password"
                               type="password"
                               value={this.state.password}
                               onChange={this.handleChange}
                               error={this.state.wrongPassword}
                               helperText={this.state.wrongPassword && "A senha deve ter no mínimo 6 dígitos."}
                               fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <br/>

                    <TextField label="Confirme a senha"
                               type="password"
                               name="samePass"
                               value={this.state.samePass}
                               onChange={this.handleChange}
                               error={this.state.wrongSamePass}
                               helperText={this.state.wrongSamePass && "As senhas fornecidas são diferentes."}
                               fullWidth/>
                </Grid>

            </Grid>
        );

    }

}

export default withRouter(PasswordForm);