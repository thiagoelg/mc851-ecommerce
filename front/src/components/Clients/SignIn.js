import React, {Component} from 'react'
import Grid from "material-ui/es/Grid/Grid";
import TextField from "material-ui/es/TextField/TextField";
import Typography from "material-ui/es/Typography/Typography";
import Button from "material-ui/es/Button/Button";
import Link from "react-router-dom/es/Link";
import {login} from '../../clients/ClientClient'
import Snackbar from "material-ui/es/Snackbar/Snackbar";
import Slide from "material-ui/es/transitions/Slide";
import UserProfile from "../../state/UserProfile";


class SignIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,

            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleClick(e) {
        const param = {
            email: this.state.email,
            password: this.state.password
        };

        login(param)
            .then(response => {
                let userManagedData = {
                    //TODO ask backend to return this name: this.state.name,
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
        this.setState({
            [target.name]: target.value
        });
    }

    render() {
        return (
            <form>
                <Grid container>
                    <Grid item xs={12}>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={this.state.open}
                            onClose={this.handleClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            TransitionComponent={<Slide {...this.props} direction="down" />}
                            message={<span id="message-id">Login realizado com sucesso!</span>}
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
                            Não possui um cadastro? <Link to="/signUp" style={{color: "blue", textDecoration: "underline"}}>Cadastre-se</Link>.
                        </Typography>
                    </Grid>
                </Grid>
            </form>

        );

    }

}

export default SignIn;