import React, {Component} from "react"
import ClientBasicForm from "./ClientBasicForm";
import AddressForm from "../Address/AddressForm";
import Grid from "@material-ui/core/es/Grid/Grid";
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button/Button";
import UserProfile from "../../state/UserProfile";
import {getClient} from "../../clients/ClientClient";

class UpdateProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            basicInfo: {
                name: '',
                email: '',
                cpf: '',
                telephone: '',
                valid: false
            },

            address: {
                identification: '',
                cep: '',
                street: '',
                number: '',
                neighborhood: '',
                city: '',
                state: '',
                compliment: '',
                valid: false
            },

            duplicateEmail: false,

            open: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }


    componentDidMount() {
        const token = UserProfile.getToken();

        getClient(token)
            .then(response => {
                const data = response.data;
                const address = data.address;

                this.setState({
                    basicInfo: {
                        name: data.name,
                        email: data.email,
                        cpf: data.cpf,
                        telephone: data.telephone,
                        valid: true
                    },

                    address: {
                        identification: address.identification || '',
                        cep: address.cep || '',
                        street: address.street || '',
                        number: address.number || '',
                        neighborhood: address.neighborhood || '',
                        city: address.city || '',
                        state: address.state || '',
                        compliment: address.compliment || '',
                        valid: false
                    }
                });
            })
            .catch(error => {
                //TODO treat error
            });
    }

    handleCancelClick(e) {
        this.props.history.goBack();
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;

        this.setState({
            [name]: target.value
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
                            <ClientBasicForm name="basicInfo"
                                             value={this.state.basicInfo}
                                             onChange={this.handleChange}/>
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
                                         value={this.state.address}
                                         onChange={this.handleChange}/>
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
                    <Button variant="raised" color="secondary" onClick={this.handleClick}>
                        Atualizar
                    </Button>
                </Grid>
            </Grid>
        );
    }

}

export default UpdateProfile;