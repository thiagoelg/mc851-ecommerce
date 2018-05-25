import React, {Component} from "react"
import Grid from "@material-ui/core/es/Grid/Grid";
import TextField from "@material-ui/core/es/TextField/TextField";
import {validateCpf, validateEmail, validateNotEmpty, validateTelephone} from "../../util/Validators";

class ClientBasicForm extends Component {

    constructor(props) {
        super(props);

        const value = props.value;
        this.state = {
            name: value.name,
            email: value.email,
            cpf: value.cpf,
            telephone: value.telephone,

            wrongName: value.wrongName,
            wrongEmail: value.wrongEmail,
            wrongCpf: value.wrongCpf,
            wrongTelephone: value.wrongTelephone

        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        }, () => {

            if (name === "name") {
                this.setState((prevState, props) => {
                    return {
                        wrongName: !validateNotEmpty(prevState.name)
                    }
                }, () => this.onChange());
            } else if (name === "email") {
                this.setState((prevState, props) => {
                    return {
                        wrongEmail: !validateEmail(prevState.email)
                    }
                }, () => this.onChange());
            } else if (name === "cpf") {
                this.setState((prevState, props) => {
                    return {
                        wrongCpf: !validateCpf(prevState.cpf)
                    }
                }, () => this.onChange());
            } else if (name === "telephone") {
                this.setState((prevState, props) => {
                    return {
                        wrongTelephone: !validateTelephone(prevState.telephone)
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
                        name: this.state.name,
                        email: this.state.email,
                        cpf: this.state.cpf,
                        telephone: this.state.telephone,

                        valid: !this.state.wrongName && !this.state.wrongEmail && !this.state.wrongCpf && !this.state.wrongTelephone,
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

                    <TextField label="Nome"
                               name="name"
                               value={this.state.name}
                               onChange={this.handleChange}
                               error={this.state.wrongName}
                               helperText={this.state.wrongName && "Informe seu nome completo."}
                               fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <br/>

                    <TextField label="E-mail"
                               type="email"
                               name="email"
                               value={this.state.email}
                               onChange={this.handleChange}
                               error={this.state.wrongEmail}
                               helperText={this.state.wrongEmail && "Informe um e-mail válido."}
                               fullWidth/>

                </Grid>

                <Grid item xs={12}>
                    <br/>

                    <TextField label="CPF" name="cpf"
                               value={this.state.cpf}
                               onChange={this.handleChange}
                               error={this.state.wrongCpf}
                               helperText={this.state.wrongCpf && "Informe um CPF válido."}
                               fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <br/>

                    <TextField label="Telefone" name="telephone"
                               value={this.state.telephone}
                               onChange={this.handleChange}
                               error={this.state.wrongTelephone}
                               helperText={this.state.wrongTelephone && "Informe um telefone válido."}
                               fullWidth/>
                </Grid>
            </Grid>
        )
    }

}

export default ClientBasicForm;