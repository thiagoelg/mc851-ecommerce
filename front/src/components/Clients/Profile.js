import React, {Component} from 'react'
import UserProfile from '../../state/UserProfile'
import {getClient} from "../../clients/ClientClient";
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import SecurityIcon from "@material-ui/icons/Security"
import Grid from "@material-ui/core/es/Grid/Grid";

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        const token = UserProfile.getToken();

        getClient(token)
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
        const cardStyle = {
            display: 'block',
            width: 'auto',
            transitionDuration: '0.3s',
            height: 'auto',
            margin: 20
        };

        const user = this.state.user;
        //FIXME remove when back end implements
        user.address = {
            identification: "Minha Casa",
            cep: "13070717",
            street: "Rua Luis Gama",
            number: "757",
            neighborhood: "Bonfim",
            city: "Campinas",
            state: "SP",
            compliment: "Casa da Frente"
        };
        const address = user.address;

        return (
            <div style={{display: "flex"}}>
                <Card style={cardStyle}>
                    <CardContent>
                        <Grid container>
                            <Grid item style={{margin: 20}}>
                                <Typography variant="headline">
                                    Meu Perfil
                                </Typography>

                                <p><b>Nome: </b>{user.name}</p>
                                <p><b>E-mail: </b>{user.email}</p>
                                <p><b>CPF: </b>{user.cpf}</p>
                                <p><b>Telefone: </b>{user.telephone}</p>
                            </Grid>
                            <Grid item style={{margin: 20}}>
                                {address && (
                                    <div>
                                        <Typography variant="title">
                                            Endereço
                                        </Typography>

                                        <p>
                                            <b>{address.identification}</b>
                                            <br/>
                                            {address.cep}
                                            <br/>
                                            {address.street}, {address.number}
                                            <br/>
                                            {address.neighborhood}, {address.city}, {address.state}
                                            <br/>
                                            {address.compliment}
                                            <br/>
                                        </p>
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button size="small">
                            <EditIcon/> Editar
                        </Button>
                        <Button size="small">
                            <SecurityIcon/> Trocar a senha
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );

    }

}

export default Profile;