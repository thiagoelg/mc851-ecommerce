import React, {Component} from "react"
import ClientBasicForm from "./ClientBasicForm";
import AddressForm from "../Address/AddressForm";
import Grid from "@material-ui/core/es/Grid/Grid";
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button/Button";
import UserProfile from "../../state/UserProfile";
import {getClient, updateClient} from "../../clients/ClientClient";

class UpdateProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            cpf: '',
            telephone: '',
            validBasicInfo: true,

            identification: '',
            cep: '',
            street: '',
            number: '',
            neighborhood: '',
            city: '',
            state: '',
            compliment: '',
            validAddress: false,

            duplicateEmail: false,

            open: false
        };

        this.handleChangeBasicInfo = this.handleChangeBasicInfo.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
    }


    componentDidMount() {
        const token = UserProfile.getToken();

        getClient(token)
            .then(response => {
                const data = response.data;

                if (!data.address) {
                    data.address = {
                        identification: '',
                        cep: '',
                        street: '',
                        number: '',
                        neighborhood: '',
                        city: '',
                        state: '',
                        compliment: ''
                    }
                }

                this.setState({
                    name: data.name,
                    email: data.email,
                    cpf: data.cpf,
                    telephone: data.telephone,

                    identification: data.address.identification,
                    cep: data.address.cep,
                    street: data.address.street,
                    number: data.address.number,
                    neighborhood: data.address.neighborhood,
                    city: data.address.city,
                    state: data.address.state,
                    compliment: data.address.compliment
                });
            }, () => console.log(this.state))
            .catch(error => {
                //TODO treat error
            });
    }

    handleCancelClick(e) {
        this.props.history.goBack();
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

    handleChangeAddress(e) {
        const target = e.target;

        this.setState({
            identification: target.identification,
            cep: target.cep,
            street: target.street,
            number: target.number,
            neighborhood: target.neighborhood,
            city: target.city,
            state: target.state,
            compliment: target.compliment,
            validAddress: target.valid
        });
    }

    handleUpdateClick(e) {
        const client = {
            name: this.state.name,
            email: this.state.email,
            cpf: this.state.cpf,
            telephone: this.state.telephone,

            address: {
                identification: this.state.identification,
                cep: this.state.cep,
                street: this.state.street,
                number: this.state.number,
                neighborhood: this.state.neighborhood,
                city: this.state.city,
                state: this.state.state,
                compliment: this.state.compliment,
            }
        };

        updateClient(UserProfile.getToken(), client)
            .then(response => {
                this.props.history.push('/profile');
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
                        <Grid item xs={2}/>
                        <Grid item xs={8}>
                            <Typography variant="headline">
                                Meus Dados
                            </Typography>
                        </Grid>
                        <Grid item xs={2}/>

                        <Grid item xs={2}/>
                        <Grid item xs={8}>
                            <ClientBasicForm name={this.state.name}
                                             email={this.state.email}
                                             cpf={this.state.cpf}
                                             telephone={this.state.telephone}
                                             onChange={this.handleChangeBasicInfo}
                                             edit={true}/>
                        </Grid>
                        <Grid item xs={2}/>

                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Grid container>
                        <Grid item xs={2}/>
                        <Grid item xs={8}>
                            <Typography variant="title">
                                Endereço
                            </Typography>
                        </Grid>
                        <Grid item xs={2}/>

                        <Grid item xs={2}/>
                        <Grid item xs={8}>
                            <AddressForm name="address"
                                         identification={this.state.identification}
                                         cep={this.state.cep}
                                         street={this.state.street}
                                         number={this.state.number}
                                         neighborhood={this.state.neighborhood}
                                         city={this.state.city}
                                         state={this.state.state}
                                         compliment={this.state.compliment}
                                         onChange={this.handleChangeAddress}/>
                        </Grid>
                        <Grid item xs={2}/>
                    </Grid>
                </Grid>

                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
                    <Button variant="raised"
                            color="default"
                            onClick={this.handleCancelClick}
                            style={{marginRight: 20}}>
                        Cancelar
                    </Button>
                    <Button variant="raised" color="secondary" onClick={this.handleUpdateClick}>
                        Atualizar
                    </Button>
                </Grid>
            </Grid>
        );
    }

}

export default UpdateProfile;