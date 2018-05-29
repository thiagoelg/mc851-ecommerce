import React, {Component} from "react"
import Grid from "@material-ui/core/es/Grid/Grid";
import TextField from "@material-ui/core/es/TextField/TextField";
import {validateCpf, validateEmail, validateNotEmpty, validateTelephone} from "../../util/Validators";
import CpfInput from "./Cpf/CpfInput";
import TelephoneInput from "./Telephone/TelephoneInput";

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
        const value = target.value;

        this.setState({
            [name]: value
        }, () => {
            const validationResult = this.validateFields([name]);
            const wrongFieldName = 'wrong' + name.charAt(0).toUpperCase() + name.slice(1);

            this.setState({
                [wrongFieldName]: validationResult[wrongFieldName],
            }, () => {
                this.onChange()
            });

        });
    }

    validateFields(names) {

        let wrongName = this.state.wrongName;
        let wrongEmail = this.state.wrongEmail;
        let wrongCpf = this.state.wrongCpf;
        let wrongTelephone = this.state.wrongTelephone;


        if (names.indexOf("name") >= 0) {
            wrongName = !validateNotEmpty(this.state.name);
        }

        if (names.indexOf("email") >= 0) {
            wrongEmail = !validateEmail(this.state.email);
        }

        if (names.indexOf("cpf") >= 0) {
            wrongCpf = !validateCpf(this.state.cpf);
        }

        if (names.indexOf("telephone") >= 0) {
            wrongTelephone = !validateTelephone(this.state.telephone);
        }

        return {
            wrongName: wrongName,
            wrongEmail: wrongEmail,
            wrongCpf: wrongCpf,
            wrongTelephone: wrongTelephone
        };
    }

    onChange() {
        if (this.props.onChange) {
            this.props.onChange({
                target: {
                    name: this.state.name,
                    email: this.state.email,
                    cpf: this.state.cpf,
                    telephone: this.state.telephone,
                    valid: !this.state.wrongEmail && !this.state.wrongName &&
                    !this.state.wrongTelephone && !this.state.wrongCpf
                }
            });
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            name: props.name,
            email: props.email,
            cpf: props.cpf,
            telephone: props.telephone,
        }, () => {
            if(props.edit) {
                const validationResult = this.validateFields(["name", "email", "cpf", "telephone"]);
                this.setState({
                    wrongName: validationResult.wrongName,
                    wrongEmail: validationResult.wrongEmail,
                    wrongCpf: validationResult.wrongCpf,
                    wrongTelephone: validationResult.wrongTelephone,
                });
            }

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
                               disabled={this.props.edit}
                               fullWidth/>

                </Grid>

                <Grid item xs={12}>
                    <br/>

                    <CpfInput name="cpf"
                              value={this.state.cpf}
                              onChange={this.handleChange}
                              disabled={this.props.edit}
                              fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <br/>

                    <TelephoneInput name="telephone"
                              value={this.state.telephone}
                              onChange={this.handleChange}
                                    fullWidth/>
                </Grid>
            </Grid>
        )
    }

}

export default ClientBasicForm;