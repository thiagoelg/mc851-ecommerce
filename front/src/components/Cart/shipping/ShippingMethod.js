import React, {Component} from "react"
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import {getClient} from "../../../clients/ClientClient";
import UserProfile from "../../../state/UserProfile";
import Grid from "@material-ui/core/es/Grid/Grid";
import AddressForm from "../../Address/AddressForm";
import Freight from "../../Freight/Freight";

class ShippingMethod extends Component {

    constructor(props) {
        super(props);

        this.state = {
            identification: '',
            cep: props.address ? props.address.cep : props.cep,
            street: '',
            number: '',
            neighborhood: '',
            city: '',
            state: '',
            complement: '',
            validAddress: false,

            shipping: {},
            clientAddress: {}
        };

        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleFreightClick = this.handleFreightClick.bind(this);
    }

    componentDidMount() {
        if(this.props.address){
            const address = this.props.address;

            this.setState({
                identification: address.identification,
                cep: address.cep,
                street: address.street,
                number: address.number,
                neighborhood: address.neighborhood,
                city: address.city,
                state: address.state,
                complement: address.complement,
                validAddress: true,

                hasAddress: !!address
            });

            return;
        }

        const token = UserProfile.getToken();

        getClient(token)
            .then(response => {
                let address = response.data.address;
                let shipping = {};

                if (!address || address.cep !== this.props.cep) {
                    address = {
                        identification: '',
                        cep: this.props.cep,
                        street: '',
                        number: '',
                        neighborhood: '',
                        city: '',
                        state: '',
                        complement: ''
                    };
                }

                if(address.cep) {
                    shipping = this.props.shipping;
                }

                this.setState({
                    identification: address.identification,
                    cep: address.cep,
                    street: address.street,
                    number: address.number,
                    neighborhood: address.neighborhood,
                    city: address.city,
                    state: address.state,
                    complement: address.complement,
                    validAddress: true,

                    hasAddress: !!address || !!this.props.cep,
                    clientAddress: response.data.address,
                    shipping: shipping
                }, () => this.invokeOnChange());
            })
            .catch(error => {
                //TODO treat error
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
            complement: target.complement,
            validAddress: target.valid
        }, () => this.invokeOnChange());
    }

    handleFreightClick(event) {
        const shipping = event.value;
        this.setState({
            shipping: shipping
        }, () => this.invokeOnChange());
    }

    invokeOnChange() {
        if(this.props.onChange) {
            const address = {
                identification: this.state.identification,
                cep: this.state.cep,
                street: this.state.street,
                number: this.state.number,
                neighborhood: this.state.neighborhood,
                city: this.state.city,
                state: this.state.state,
                complement: this.state.complement
            };

            this.props.onChange({
                name: this.props.name,
                shipping: this.state.shipping,
                address: address,
                valid: this.state.validAddress && this.state.shipping && Object.keys(this.state.shipping).length
            });
        }
    }


    render() {

        return (
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="headline" color="secondary">
                                <b>Endereço de entrega</b>
                            </Typography>
                            <br/>
                            <Divider/>
                        </Grid>

                        <Grid item xs={12} style={{paddingRight: 20}}>
                            <AddressForm name="address"
                                         identification={this.state.identification}
                                         cep={this.state.cep}
                                         street={this.state.street}
                                         number={this.state.number}
                                         neighborhood={this.state.neighborhood}
                                         city={this.state.city}
                                         state={this.state.state}
                                         complement={this.state.complement}
                                         onChange={this.handleChangeAddress}
                                         edit={this.state.hasAddress}/>
                        </Grid>

                        <Grid item xs={12}>
                            <br/>
                            <Typography variant="headline" color="secondary">
                                <b>Frete</b>
                            </Typography>
                            <br/>
                            <Divider/>
                            <br/>
                        </Grid>
                        <Grid item xs={12}>
                            <Freight
                                name="shipping"
                                label="Calcular frete e prazo:"
                                products={this.props.products}
                                onChange={this.handleFreightClick}
                                enableSelection={true}
                                disableCep={true}
                                cep={this.state.cep}
                                shipping={this.props.shipping}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

}

export default ShippingMethod;