import React, {Component} from 'react'
import Grid from "@material-ui/core/es/Grid/Grid";
import TextField from "@material-ui/core/es/TextField/TextField";
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button";
import Link from "react-router-dom/es/Link";
import {login} from '../../clients/ClientClient'
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";
import UserProfile from "../../state/UserProfile";
import {validateEmail, validateNotEmpty} from "../../util/Validators";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Close from "@material-ui/icons/es/Close";


class SignIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,

            email: '',
            password: '',

            wrongEmail: false,
            wrongPassword: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose = () => {
        this.setState({open: false});
    };

    handleClick(e) {
        let wrongEmail = !validateEmail(this.state.email);
        let wrongPassword = !validateNotEmpty(this.state.password);

        if (wrongEmail || wrongPassword) {
            this.setState({
                wrongEmail: wrongEmail,
                wrongPassword: wrongPassword,
                open: true
            });
            return;
        }

        const param = {
            email: this.state.email,
            password: this.state.password
        };

        login(param)
            .then(response => {
                UserProfile.set(response.headers["x-auth-token"]);
                this.props.history.push('/')
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.setState({
                        open: true
                    });
                    return;
                }
                //TODO treat error
            })
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        }, () => {
            let wrongEmail = this.state.wrongEmail;
            let wrongPassword = this.state.wrongPassword;

            if (name === "email") {
                wrongEmail = !validateEmail(this.state.email);
            }

            if(name === "password") {
                wrongPassword = !validateNotEmpty(this.state.password);
            }

            this.setState({
                wrongEmail: wrongEmail,
                wrongPassword: wrongPassword
            });

        });
    }

    render() {
        return (
            <form>
                <Grid container>
                    <Grid item xs={12}>
                        <Snackbar
                            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                            open={this.state.open}
                            onClose={this.handleClose}
                            autoHideDuration={5000}
                            message={<span id="message-id">Login ou senha inválidos!</span>}
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
                            Login
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Você precisa estar logado para realizar qualquer compra no site.</Typography>
                    </Grid>

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

                        <TextField label="Senha" name="password"
                                   type="password"
                                   value={this.state.password}
                                   onChange={this.handleChange}
                                   error={this.state.wrongPassword}
                                   fullWidth/>
                    </Grid>
                    <Grid item sm={4}/>

                    <Grid item sm={4}/>
                    <Grid item xs={12} sm={4} style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
                        <Button variant="raised" color="secondary" onClick={this.handleClick}>
                            Entrar
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Não possui um cadastro? <Link to="/signUp" style={{
                            color: "blue",
                            textDecoration: "underline"
                        }}>Cadastre-se</Link>.
                        </Typography>
                    </Grid>
                </Grid>
            </form>

        );

    }

}

export default SignIn;