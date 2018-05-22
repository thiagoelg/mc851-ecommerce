import React, {Component} from 'react'
import UserProfile from '../../state/UserProfile'
import {getClient} from "../../clients/ClientClient";
import Grid from "@material-ui/core/es/Grid/Grid";
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button";

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        const id = UserProfile.getId();

        getClient(id)
            .then(response => {
                this.setState({
                    user: response.data
                });
            })
            .catch(error => {
                //TODO treat error
            });
    }

    render() {

        return (
            <Grid container>
                <Grid item xs={6}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="headline">
                                Meu Perfil
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <p><b>Nome: </b>{this.state.user.name}</p>
                            <p><b>E-mail: </b>{this.state.user.email}</p>
                            <p><b>CPF: </b>{this.state.user.cpf}</p>
                            <p><b>Telefone: </b>{this.state.user.telephone}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="subheading">
                                Endereço
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <p><b>Rua: </b>{this.state.user.street}</p>
                            <p><b>Número: </b>{this.state.user.number}</p>
                            <p><b>Bairro: </b>{this.state.user.neighborhood}</p>
                            <p><b>Cidade: </b>{this.state.user.city}</p>
                            <p><b>Estado: </b>{this.state.user.state}</p>
                            <p><b>CEP: </b>{this.state.user.cep}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container style={{marginTop: 10, marginBottom: 20}}>
                        <Grid item xs={4}>
                            <Button variant="raised" color="default">
                                Alterar Meus Dados
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="raised" color="default">
                                Minhas Compras
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="raised" color="default">
                                Atendimento
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );

    }

}

export default Profile;