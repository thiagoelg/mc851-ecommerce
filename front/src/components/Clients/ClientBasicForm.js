import React, {Component} from "react"
import Grid from "@material-ui/core/es/Grid/Grid";
import TextField from "@material-ui/core/es/TextField/TextField";
import {validateCpf, validateEmail, validateNotEmpty, validateTelephone} from "../../util/Validators";

class ClientBasicForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            email: props.email,
            cpf: props.cpf,
            telephone: props.telephone,

            wrongName: false,
            wrongEmail: false,
            wrongCpf: false,
            wrongTelephone: false

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
                }, () => this.onChange(target));
            } else if (name === "email") {
                this.setState((prevState, props) => {
                    return {
                        wrongEmail: !validateEmail(prevState.email)
                    }
                }, () => this.onChange(target));
            } else if (name === "cpf") {
                this.setState((prevState, props) => {
                    return {
                        wrongCpf: !validateCpf(prevState.cpf)
                    }
                }, () => this.onChange(target));
            } else if (name === "telephone") {
                this.setState((prevState, props) => {
                    return {
                        wrongTelephone: !validateTelephone(prevState.telephone)
                    }
                }, () => this.onChange(target));
            }

        });
    }

    onChange(target) {
        if (this.props.onChange) {
            this.props.onChange({
                target: {
                    name: target.name,
                    value: target.value,
                    valid: !this.state.wrongEmail && !this.state.wrongName &&
                            !this.state.wrongTelephone && !this.state.wrongCpf
                }
            });
        }
    }

    componentWillReceiveProps(props) {
        //TODO validate
        this.setState({
            name: props.name,
            email: props.email,
            cpf: props.cpf,
            telephone: props.telephone,
        });
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