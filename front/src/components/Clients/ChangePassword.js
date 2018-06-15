import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import Grid from "@material-ui/core/es/Grid/Grid";
import Typography from "@material-ui/core/es/Typography/Typography";
import PasswordForm from "./PasswordForm";
import Button from "@material-ui/core/es/Button/Button";
import TextField from "@material-ui/core/es/TextField/TextField";
import {validatePassword} from "../../util/Validators";
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Close from "@material-ui/icons/es/Close";
import {changePassword} from "../../clients/ClientClient";
import UserProfile from "../../state/UserProfile";
import {treatError} from "../../util/ErrorUtils";

class ChangePassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: {
                password: '',
                valid: false
            },

            oldPassword: '',
            wrongOldPassword: false,
            unauthorized: false
        };

        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleChangePasswordClick = this.handleChangePasswordClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    handleCancelClick(e) {
        this.props.history.goBack();
    }

    handleChangePasswordClick(e) {
        if (!this.state.password.valid || this.state.wrongOldPassword) {
            this.setState({
                open: true
            });
            return;
        }

        const request = {
            oldPassword: this.state.oldPassword,
            password: this.state.password.password
        };

        changePassword(UserProfile.getToken(), request)
            .then(response => {
                this.props.history.push("/profile");
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.setState({
                        open: true,
                        unauthorized: true
                    });
                    return;
                }
                treatError(this.props, error);
            });
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        }, () => {
            if (name === "oldPassword") {
                this.setState((prevState, props) => {
                    return {wrongOldPassword: !validatePassword(prevState.oldPassword)}
                });
            }
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
            <Grid container>
                <Grid item xs={12}>
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                        open={this.state.open}
                        onClose={this.handleClose}
                        autoHideDuration={5000}
                        message={
                            <span id="message-id" color="error">
                                {(!this.state.password.valid || this.state.wrongOldPassword) &&
                                <p>Preencha todos os campos corretamente.<br/></p>
                                }
                                {this.state.unauthorized &&
                                <p>Senha inválida!</p>
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
                </Grid>
                <Grid item sm={4}/>
                <Grid item xs={12} sm={4}>
                    <Typography variant="headline">
                        Trocar minha senha
                    </Typography>
                </Grid>
                <Grid item sm={4}/>

                <Grid item sm={4}/>
                <Grid item xs={12} sm={4}>
                    <br/>

                    <TextField label="Senha Atual" name="oldPassword"
                               type="password"
                               value={this.state.oldPassword}
                               onChange={this.handleChange}
                               error={this.state.wrongOldPassword}
                               helperText={this.state.wrongOldPassword && "A senha deve ter no mínimo 6 dígitos."}
                               fullWidth/>
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
                    <Button variant="raised"
                            color="default"
                            onClick={this.handleCancelClick}
                            style={{marginRight: 20}}>
                        Cancelar
                    </Button>
                    <Button variant="raised" color="secondary" onClick={this.handleChangePasswordClick}>
                        Trocar
                    </Button>
                </Grid>
                <Grid item xs={4}/>
            </Grid>
        );
    }

}

export default withRouter(ChangePassword);