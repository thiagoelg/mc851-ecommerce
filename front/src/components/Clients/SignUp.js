import React, {Component} from 'react'
import Grid from "material-ui/es/Grid/Grid";
import TextField from "material-ui/es/TextField/TextField";
import Typography from "material-ui/es/Typography/Typography";
import Button from "material-ui/es/Button/Button";
import Link from "react-router-dom/es/Link";
import Snackbar from "material-ui/es/Snackbar/Snackbar";
import UserProfile from '../../state/UserProfile'
import {withRouter} from 'react-router-dom'
import {register} from '../../clients/ClientClient'
import {
    validateCpf,
    validateEmail,
    validateNotEmpty,
    validatePassword,
    validateSamePass,
    validateTelephone
} from "../../util/Validators";
import IconButton from "material-ui/es/IconButton/IconButton";
import Close from "@material-ui/icons/es/Close";


class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            cpf: '',
            telephone: '',
            password: '',
            samePass: '',

            wrongName: false,
            wrongEmail: false,
            wrongCpf: false,
            wrongTelephone: false,
            wrongPassword: false,
            wrongSamePass: false,

            open: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    validate() {
        let wrongName = !validateNotEmpty(this.state.name);
        let wrongEmail = !validateEmail(this.state.email);
        let wrongCpf = !validateCpf(this.state.cpf);
        let wrongTelephone = !validateTelephone(this.state.telephone);
        let wrongPassword = !validatePassword(this.state.password);
        let wrongSamePass = !validateSamePass(this.state.password, this.state.samePass);

        this.setState({
            wrongName: wrongName,
            wrongEmail: wrongEmail,
            wrongCpf: wrongCpf,
            wrongTelephone: wrongTelephone,
            wrongPassword: wrongPassword,
            wrongSamePass: wrongSamePass
        });

        return !wrongName && !wrongEmail && !wrongCpf && !wrongTelephone && !wrongPassword && !wrongSamePass;
    }

    handleClick(e) {

        if (!this.validate()) {
            this.setState({open: true});
            return;
        }

        let params = {
            name: this.state.name,
            email: this.state.email,
            cpf: this.state.cpf,
            telephone: this.state.telephone,
            password: this.state.password,
            samePass: this.state.samePass
        };

        register(params)
            .then(response => {
                let userManagedData = {
                    name: this.state.name,
                    id: response.data
                };
                UserProfile.set(userManagedData);
                this.props.history.push('/')
            })
            .catch(error => {
                //TODO treat error
            })
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        }, () => {

            let wrongName = this.state.wrongName;
            let wrongEmail = this.state.wrongEmail;
            let wrongCpf = this.state.wrongCpf;
            let wrongTelephone = this.state.wrongTelephone;
            let wrongPassword = this.state.wrongPassword;
            let wrongSamePass = this.state.wrongSamePass;

            if (name === "name") {
                wrongName = !validateNotEmpty(this.state.name);
            } else if (name === "email") {
                wrongEmail = !validateEmail(this.state.email);
            } else if (name === "cpf") {
                wrongCpf = !validateCpf(this.state.cpf)
            } else if (name === "telephone") {
                wrongTelephone = !validateTelephone(this.state.telephone);
            } else if (name === "password") {
                wrongPassword = !validatePassword(this.state.password);
            } else if (name === "samePass") {
                wrongSamePass = !validateSamePass(this.state.password, this.state.samePass);
            }

            this.setState({
                wrongName: wrongName,
                wrongEmail: wrongEmail,
                wrongCpf: wrongCpf,
                wrongTelephone: wrongTelephone,
                wrongPassword: wrongPassword,
                wrongSamePass: wrongSamePass
            });
        });
    }

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        return (
            <form>
                <Grid container>
                    <Grid item xs={12}>
                        <Snackbar
                            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                            open={this.state.open}
                            onClose={this.handleClose}
                            message={
                                <span id="message-id" color="error">
                                    {this.state.wrongName && <p>Informe seu nome completo.<br/></p>}
                                    {this.state.wrongEmail && <p>Informe um e-mail válido.<br/></p>}
                                    {this.state.wrongCpf && <p>Informe um CPF válido.<br/></p>}
                                    {this.state.wrongTelephone && <p>Informe um telefone válido.<br/></p>}
                                    {this.state.wrongPassword && <p>A senha deve ter no mínimo 6 dígitos.<br/></p>}
                                    {this.state.wrongSamePass && <p>As senhas fornecidas são diferentes.<br/></p>}
                                </span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={this.handleClose}
                                >
                                    <Close/>
                                </IconButton>,
                            ]}
                        />
                        <Typography variant="headline">
                            Cadastre-se
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Você precisa ter uma conta para realizar qualquer compra no site.</Typography>
                    </Grid>

                    <Grid item sm={4}/>
                    <Grid item xs={12} sm={4}>
                        <br/>

                        <TextField label="Nome"
                                   name="name"
                                   value={this.state.name}
                                   onChange={this.handleChange}
                                   error={this.state.wrongName}
                                   fullWidth/>
                    </Grid>
                    <Grid item sm={4}/>

                    <Grid item sm={4}/>
                    <Grid item xs={12} sm={4}>
                        <br/>

                        <TextField label="E-mail"
                                   type="email"
                                   name="email"
                                   value={this.state.email}
                                   onChange={this.handleChange}
                                   error={this.state.wrongEmail}
                                   fullWidth/>

                    </Grid>
                    <Grid item sm={4}/>

                    <Grid item sm={4}/>
                    <Grid item xs={12} sm={4}>
                        <br/>

                        <TextField label="CPF" name="cpf"
                                   value={this.state.cpf}
                                   onChange={this.handleChange}
                                   error={this.state.wrongCpf}
                                   fullWidth/>
                    </Grid>
                    <Grid item sm={4}/>

                    <Grid item sm={4}/>
                    <Grid item xs={12} sm={4}>
                        <br/>

                        <TextField label="Telefone" name="telephone"
                                   value={this.state.telephone}
                                   onChange={this.handleChange}
                                   error={this.state.wrongTelephone}
                                   fullWidth/>
                    </Grid>
                    <Grid item sm={4}/>

                    <Grid item sm={4}/>
                    <Grid item xs={12} sm={4}>
                        <br/>

                        <TextField label="Senha" name="password"
                                   type="password"
                                   value={this.state.password}
                                   onChange={this.handleChange}
                                   error={this.state.wrongPassword}
                                   fullWidth/>
                    </Grid>
                    <Grid item sm={4}/>

                    <Grid item sm={4}/>
                    <Grid item xs={12} sm={4}>
                        <br/>

                        <TextField label="Confirme a senha"
                                   type="password"
                                   name="samePass"
                                   value={this.state.samePass}
                                   onChange={this.handleChange}
                                   error={this.state.wrongSamePass}
                                   fullWidth/>
                    </Grid>
                    <Grid item sm={4}/>

                    <Grid item sm={4}/>
                    <Grid item xs={12} sm={4} style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
                        <Button variant="raised" color="secondary" onClick={this.handleClick}>
                            Cadastrar
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Já possui uma conta? <Link to="/signIn"
                                                       style={{color: "blue", textDecoration: "underline"}}>Entre</Link>.
                        </Typography>
                    </Grid>
                </Grid>
            </form>

        );

    }

}

export default withRouter(SignUp);