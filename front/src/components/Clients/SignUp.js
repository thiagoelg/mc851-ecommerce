import React, {Component} from 'react'
import Grid from "@material-ui/core/es/Grid/Grid";
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button";
import Link from "react-router-dom/es/Link";
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";
import UserProfile from '../../state/UserProfile'
import {withRouter} from 'react-router-dom'
import {register} from '../../clients/ClientClient'
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Close from "@material-ui/icons/es/Close";
import ClientBasicForm from "./ClientBasicForm";
import PasswordForm from "./PasswordForm";


class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            cpf: '',
            telephone: '',
            validBasicInfo: false,

            password: {
                password: '',
                valid: false
            },

            duplicateEmail: false,

            open: false
        };

        this.handleChangeBasicInfo = this.handleChangeBasicInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick(e) {

        if (!this.state.validBasicInfo || !this.state.password.valid) {
            this.setState({
                open: true
            });
            return;
        }

        let params = {
            name: this.state.name,
            email: this.state.email,
            cpf: this.state.cpf,
            telephone: this.state.telephone,
            password: this.state.password.password
        };

        register(params)
            .then(response => {
                UserProfile.set(response.headers["x-auth-token"]);
                this.props.history.push('/')
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    this.setState({
                        open: true,
                        duplicateEmail: true
                    });
                    return;
                }
                //TODO treat error
            })
    }

    handleChangeBasicInfo(e) {
        const target = e.target;

        this.setState({
            name: target.name,
            email: target.email,
            cpf: target.cpf,
            telephone: target.telephone,
            validBasicInfo: target.valid
        });
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    handleClose = () => {
        this.setState({
            open: false,
            duplicateEmail: false
        });
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
                            autoHideDuration={5000}
                            message={
                                <span id="message-id" color="error">
                                    {this.state.duplicateEmail && <p>Esse e-mail já está cadastrado.<br/></p>}
                                    {(!this.state.validBasicInfo || !this.state.password.valid) &&
                                    <p>Preencha todos os campos corretamente.<br/></p>
                                    }
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
                        <ClientBasicForm name={this.state.name}
                                         email={this.state.email}
                                         cpf={this.state.cpf}
                                         telephone={this.state.telephone}
                                         onChange={this.handleChangeBasicInfo}/>
                    </Grid>
                    <Grid item sm={4}/>

                    <Grid item sm={4}/>
                    <Grid item xs={12} sm={4}>
                        <PasswordForm name="password"
                                      value={this.state.password}
                                      onChange={this.handleChange}/>
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