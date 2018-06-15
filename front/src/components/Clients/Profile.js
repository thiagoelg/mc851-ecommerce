import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import UserProfile from '../../state/UserProfile'
import {getClient} from "../../clients/ClientClient";
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import EditIcon from "@material-ui/icons/Edit"
import SecurityIcon from "@material-ui/icons/Security"
import Grid from "@material-ui/core/es/Grid/Grid";
import Link from "../Link/Link";
import {treatError} from "../../util/ErrorUtils";
import Fade from "@material-ui/core/es/Fade/Fade";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},

            loading: true
        }
    }

    componentDidMount() {
        const token = UserProfile.getToken();

        getClient(token)
            .then(response => {
                this.setState({
                    user: response.data,
                    loading: false
                });
            })
            .catch(error => {
                treatError(this.props, error);
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
        const address = user.address;

        return (
            <div style={{display: "flex", justifyContent: "center"}}>
                {this.state.loading ? (
                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                        <Fade
                            in={this.state.loading}
                            style={{
                                transitionDelay: this.state.loading ? '800ms' : '0ms'
                            }}
                            unmountOnExit
                        >
                            <CircularProgress/>
                        </Fade>
                    </Grid>
                ) : (
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
                                                {address.street}{address.street && ", "}
                                                {address.number}
                                                <br/>
                                                {address.neighborhood}{address.neighborhood && ", "}
                                                {address.city}{address.city && ", "}
                                                {address.state}
                                                <br/>
                                                {address.complement}
                                                <br/>
                                            </p>
                                        </div>
                                    )}
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Link to="/profile/update">
                                <Button size="small">
                                    <EditIcon/> Editar
                                </Button>
                            </Link>
                            <Link to='/profile/changepassword'>
                                <Button size="small">
                                    <SecurityIcon/> Trocar a senha
                                </Button>
                            </Link>
                        </CardActions>
                    </Card>
                )}
            </div>
        );

    }

}

export default withRouter(Profile);