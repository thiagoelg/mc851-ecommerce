import React, {Component} from 'react'
import Grid from "material-ui/es/Grid/Grid";
import TextField from "material-ui/es/TextField/TextField";
import Typography from "material-ui/es/Typography/Typography";
import Button from "material-ui/es/Button/Button";
import Link from "react-router-dom/es/Link";
import Snackbar from "material-ui/es/Snackbar/Snackbar";
import Slide from "material-ui/es/transitions/Slide";
import UserProfile from '../../state/UserProfile'
import {withRouter} from 'react-router-dom'
import {register} from '../../clients/ClientClient'


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

            open: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick(e) {
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
                this.setState({
                    open:true
                }, () => {
                    let userManagedData = {
                        name: this.state.name,
                        id: response.data
                    };
                    UserProfile.set(userManagedData);
                    this.props.history.push('/')
                })
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

    handleClose = () => {
        this.setState({ open: false });
    };

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
                            message={<span id="message-id">Registrado com sucesso!</span>}
                        />
                        <Typography variant="headline">
                            Cadastre-se
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Você precisa ter uma conta para realizar qualquer compra no site.</Typography>
                    </Grid>

                    <Grid item xs={0} sm={4}/>
                    <Grid item xs={12} sm={4}>
                        <br/>

                        <TextField label="Nome"
                                   name="name"
                                   value={this.state.name}
                                   onChange={this.handleChange}
                                   fullWidth/>
                    </Grid>
                    <Grid item xs={0} sm={4}/>

                    <Grid item xs={0} sm={4}/>
                    <Grid item xs={12} sm={4}>
                        <br/>

                        <TextField label="E-mail"
                                   type="email"
                                   name="email"
                                   value={this.state.email}
                                   onChange={this.handleChange}
                                   fullWidth/>

                    </Grid>
                    <Grid item xs={0} sm={4}/>

                    <Grid item xs={0} sm={4}/>
                    <Grid item xs={12} sm={4}>
                        <br/>

                        <TextField label="CPF" name="cpf"
                                   value={this.state.cpf}
                                   onChange={this.handleChange}
                                   fullWidth/>
                    </Grid>
                    <Grid item xs={0} sm={4}/>

                    <Grid item xs={0} sm={4}/>
                    <Grid item xs={12} sm={4}>
                        <br/>

                        <TextField label="Telefone" name="telephone"
                                   value={this.state.telephone}
                                   onChange={this.handleChange}
                                   fullWidth/>
                    </Grid>
                    <Grid item xs={0} sm={4}/>

                    <Grid item xs={0} sm={4}/>
                    <Grid item xs={12} sm={4}>
                        <br/>

                        <TextField label="Senha" name="password"
                                   type="password"
                                   value={this.state.password}
                                   onChange={this.handleChange}
                                   fullWidth/>
                    </Grid>
                    <Grid item xs={0} sm={4}/>

                    <Grid item xs={0} sm={4}/>
                    <Grid item xs={12} sm={4}>
                        <br/>

                        <TextField label="Confirme a senha"
                                   type="password"
                                   name="samePass"
                                   value={this.state.samePass}
                                   onChange={this.handleChange}
                                   fullWidth/>
                    </Grid>
                    <Grid item xs={0} sm={4}/>

                    <Grid item xs={0} sm={4}/>
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